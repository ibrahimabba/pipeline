import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ProfileInput } from './dto/create-profile-input';

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

  @Query('profile')
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
}
