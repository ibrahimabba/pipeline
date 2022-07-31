/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { executeCypherQuery, session } from '../database';
import { hashPassword } from 'src/utils/auth';
import { ProfileInput } from './dto/create-profile-input';
import { QueryResult } from 'neo4j-driver';

@Injectable()
export class UsersRepository {
  async create(createUserInput: CreateUserInput) {
    const query = `CREATE (user:User { id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, phone: $phone, location: $location }) RETURN user`;
    const params = {
      id: uuidv4(),
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      email: createUserInput.email,
      password: await hashPassword(createUserInput.password),
      phone: createUserInput.phone,
      location: createUserInput.location,
    };
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  async findAll() {
    const query = 'MATCH (users:User) RETURN users LIMIT 100';
    const params = {};
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  async findUserByEmail(email: string) {
    const query = 'MATCH (user:User { email: $email }) RETURN user';
    const params = { email };
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  async findUserByPhone(phone: string) {
    const query = 'MATCH (user:User { phone: $phone }) RETURN user';
    const params = { phone };
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  async findOne(id: string) {
    const query = 'MATCH (user:User { id: $id }) RETURN user';
    const params = { id };
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  async createProfile(userId: string, profileInput: ProfileInput) {
    let profileResultObj: QueryResult;
    const workExperience: any[] = [];
    const education: any[] = [];
    const projects: any[] = [];

    try {
      await session.writeTransaction(async (tx) => {
        const profileQuery = `MATCH (user:User { id: $userId }) CREATE (user)-[:HAS_PROFILE]->(profile:Profile { id: $id, bio: $bio, image: $image, skills: $skills }) RETURN profile`;
        const profileParams = {
          userId,
          id: uuidv4(),
          bio: profileInput.bio,
          image: profileInput.image,
          skills: profileInput.skills,
        };
        profileResultObj = await tx.run(profileQuery, profileParams);

        const workExperienceQuery = `MATCH (user:User { id: $userId }) CREATE (user)-[:HAS_WORK_EXPERIENCE]->(workExperience:WorkExperience { id: $id, company: $company, position: $position, startDate: $startDate, endDate: $endDate }) RETURN workExperience`;
        profileInput.workExperience.forEach(async (workExperienceInput) => {
          const workExperienceParams = {
            userId,
            id: uuidv4(),
            company: workExperienceInput.company,
            position: workExperienceInput.position,
            startDate: workExperienceInput.startDate,
            endDate: workExperienceInput.endDate,
          };
          const exprience = await tx.run(
            workExperienceQuery,
            workExperienceParams,
          );
          workExperience.push(exprience);
        });

        const educationQuery = `MATCH (user:User { id: $userId }) CREATE (user)-[:HAS_EDUCATION]->(education:Education { id: $id, school: $school, degree: $degree, startDate: $startDate, endDate: $endDate }) RETURN education`;
        profileInput.education.forEach(async (educationInput) => {
          const educationParams = {
            userId,
            id: uuidv4(),
            school: educationInput.school,
            degree: educationInput.degree,
            startDate: educationInput.startDate,
            endDate: educationInput.endDate,
          };
          const edu = await tx.run(educationQuery, educationParams);
          education.push(edu);
        });

        const projectsQuery = `MATCH (user:User { id: $userId }) CREATE (user)-[:HAS_PROJECT]->(project:Project { id: $id, name: $name, description: $description, image: $image, url: $url, github: $github, startDate: $startDate, endDate: $endDate }) RETURN project`;
        profileInput.projects.forEach(async (projectInput) => {
          const projectParams = {
            userId,
            id: uuidv4(),
            name: projectInput.name,
            description: projectInput.description,
            image: projectInput.image,
            url: projectInput.url,
            github: projectInput.github,
            startDate: projectInput.startDate,
            endDate: projectInput.endDate,
          };
          const project = await tx.run(projectsQuery, projectParams);
          projects.push(project);
        });
      });
    } catch (error) {
      console.log(error);
    }

    return { profileResultObj, workExperience, education, projects };
  }

  findUserProfile(userId: string) {
    return `This action returns a user profile`;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
