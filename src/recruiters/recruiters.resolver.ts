import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { RecruitersService } from './recruiters.service';
import { CreateRecruiterInput } from './dto/create-recruiter.input';
import { UpdateRecruiterInput } from './dto/update-recruiter.input';

@Resolver('Recruiter')
export class RecruitersResolver {
  constructor(private readonly recruitersService: RecruitersService) {}

  @Mutation('createRecruiter')
  create(
    @Args('createRecruiterInput') createRecruiterInput: CreateRecruiterInput,
  ) {
    return this.recruitersService.signUp(createRecruiterInput);
  }

  @Query('logInRecruiter')
  logIn(@Args('email') email: string, @Args('password') password: string) {
    return this.recruitersService.logIn(email, password);
  }

  @Query('recruiter')
  findOne(@Args('id') id: string) {
    return this.recruitersService.findOne(id);
  }

  @Query('viewTalents')
  viewTalents() {
    return this.recruitersService.viewTalents();
  }

  @Query('viewTalent')
  viewTalent(@Args('id') id: string) {
    return this.recruitersService.viewTalent(id);
  }

  @Mutation('updateRecruiter')
  update(
    @Args('updateRecruiterInput') updateRecruiterInput: UpdateRecruiterInput,
  ) {
    return this.recruitersService.update(
      updateRecruiterInput.id,
      updateRecruiterInput,
    );
  }

  @Mutation('removeRecruiter')
  remove(@Args('id') id: string) {
    return this.recruitersService.remove(id);
  }
}
