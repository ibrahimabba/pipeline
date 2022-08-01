import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ProfileInput } from './dto/create-profile-input';
import { UpdateProfileInput } from './dto/update-profile-input';
import { WorkExperienceInput } from './dto/update-workexperience-input';
import { EducationInput } from './dto/update-education-input';
import { ProjectInput } from './dto/update-projects-input';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('signUp')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.signUp(createUserInput);
  }

  @Query('logIn')
  logIn(@Args('email') email: string, @Args('password') password: string) {
    return this.usersService.logIn(email, password);
  }

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Query('getUserprofile')
  findUserProfile(@Args('userId') userId: string) {
    return this.usersService.findUserProfile(userId);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @Mutation('createProfile')
  createProfile(
    @Args('userId') userId: string,
    @Args('profile') profile: ProfileInput,
  ) {
    return this.usersService.createProfile(userId, profile);
  }

  @Mutation('updateProfile')
  updateProfile(
    @Args('userId') userId: string,
    @Args('profile') profile: UpdateProfileInput,
  ) {
    return this.usersService.updateProfile(userId, profile);
  }

  @Mutation('updateWorkExperience')
  updateWorkExperience(
    @Args('userId') userId: string,
    @Args('workExperience') workExprience: WorkExperienceInput,
  ) {
    return this.usersService.updateWorkExperience(userId, workExprience);
  }

  @Mutation('addWorkExperience')
  addWorkExperience(
    @Args('userId') userId: string,
    @Args('workExperience') workExprience: WorkExperienceInput,
  ) {
    return this.usersService.addWorkExperience(userId, workExprience);
  }

  @Mutation('removeWorkExperience')
  removeWorkExperience(@Args('userId') userId: string, @Args('id') id: string) {
    return this.usersService.removeWorkExperience(userId, id);
  }

  @Mutation('updateEducation')
  updateEducation(
    @Args('userId') userId: string,
    @Args('education') education: EducationInput,
  ) {
    return this.usersService.updateEducation(userId, education);
  }

  @Mutation('addEducation')
  addEducation(
    @Args('userId') userId: string,
    @Args('education') education: EducationInput,
  ) {
    return this.usersService.addEducation(userId, education);
  }

  @Mutation('removeEducation')
  removeEducation(@Args('userId') userId: string, @Args('id') id: string) {
    return this.usersService.removeEducation(userId, id);
  }

  @Mutation('updateProject')
  updateProject(
    @Args('userId') userId: string,
    @Args('project') project: ProjectInput,
  ) {
    return this.usersService.updateProject(userId, project);
  }

  @Mutation('addProject')
  addProject(
    @Args('userId') userId: string,
    @Args('project') project: ProjectInput,
  ) {
    return this.usersService.addProject(userId, project);
  }

  @Mutation('removeProject')
  removeProject(@Args('userId') userId: string, @Args('id') id: string) {
    return this.usersService.removeProject(userId, id);
  }
}
