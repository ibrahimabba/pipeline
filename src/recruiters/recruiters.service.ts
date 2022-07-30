import { Injectable } from '@nestjs/common';
import { CreateRecruiterInput } from './dto/create-recruiter.input';
import { UpdateRecruiterInput } from './dto/update-recruiter.input';

@Injectable()
export class RecruitersService {
  create(createRecruiterInput: CreateRecruiterInput) {
    return 'This action adds a new recruiter';
  }

  findAll() {
    return `This action returns all recruiters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recruiter`;
  }

  update(id: number, updateRecruiterInput: UpdateRecruiterInput) {
    return `This action updates a #${id} recruiter`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruiter`;
  }
}
