/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { executeCypherQuery } from 'src/database';
import { hashPassword } from 'src/utils/auth';
import { v4 as uuidv4 } from 'uuid';
import { CreateRecruiterInput } from './dto/create-recruiter.input';
import { UpdateRecruiterInput } from './dto/update-recruiter.input';

@Injectable()
export class RecruitersRepository {
  async create(createRecruiterInput: CreateRecruiterInput) {
    const query = `CREATE (recruiter:Recruiter { id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, image: $image, company: $company }) RETURN recruiter`;
    const params = {
      id: uuidv4(),
      firstName: createRecruiterInput.firstName,
      lastName: createRecruiterInput.lastName,
      email: createRecruiterInput.email,
      password: await hashPassword(createRecruiterInput.password),
      image: createRecruiterInput.image,
      company: createRecruiterInput.company,
    };
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  async findRecruiterByEmail(email: string) {
    const query = 'MATCH (recruiter:Recruiter { email: $email }) RETURN recruiter';
    const params = { email };
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  async findOne(id: string) {
    const query = 'MATCH (recruiter:Recruiter { id: $id }) RETURN recruiter';
    const params = { id };
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  async update(id: string, updateRecruiterInput: UpdateRecruiterInput) {
    const query = `MATCH (recruiter:Recruiter { id: $id }) SET recruiter.firstName = $firstName, recruiter.lastName = $lastName, recruiter.email = $email, recruiter.company = $company, recruiter.image = $image, recruiter.password = $password RETURN recruiter`;
    const params = {
      id: id,
      firstName: updateRecruiterInput.firstName,
      lastName: updateRecruiterInput.lastName,
      image: updateRecruiterInput.image,
      company: updateRecruiterInput.company,
      email: updateRecruiterInput.email,
      password: await hashPassword(updateRecruiterInput.password),
    };
    return executeCypherQuery(query, params);
  }

  async viewTalents(){
    const query = 'MATCH (users:User) RETURN users LIMIT 100';
    const params = {};
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  async viewTalent(id: string){
    const query = 'MATCH (user:User { id: $id }) RETURN user';
    const params = { id };
    const resultObj = await executeCypherQuery(query, params);
    return resultObj;
  }

  remove(id: string) {
    const query = `MATCH (recruiter:Recruiter { id: $id }) DETACH DELETE recruiter`;
    const params = { id };
    return executeCypherQuery(query, params);
  }
}
