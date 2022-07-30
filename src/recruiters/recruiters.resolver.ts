import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RecruitersService } from './recruiters.service';
import { CreateRecruiterInput } from './dto/create-recruiter.input';
import { UpdateRecruiterInput } from './dto/update-recruiter.input';

@Resolver('Recruiter')
export class RecruitersResolver {
  constructor(private readonly recruitersService: RecruitersService) {}

  @Mutation('createRecruiter')
  create(@Args('createRecruiterInput') createRecruiterInput: CreateRecruiterInput) {
    return this.recruitersService.create(createRecruiterInput);
  }

  @Query('recruiters')
  findAll() {
    return this.recruitersService.findAll();
  }

  @Query('recruiter')
  findOne(@Args('id') id: number) {
    return this.recruitersService.findOne(id);
  }

  @Mutation('updateRecruiter')
  update(@Args('updateRecruiterInput') updateRecruiterInput: UpdateRecruiterInput) {
    return this.recruitersService.update(updateRecruiterInput.id, updateRecruiterInput);
  }

  @Mutation('removeRecruiter')
  remove(@Args('id') id: number) {
    return this.recruitersService.remove(id);
  }
}
