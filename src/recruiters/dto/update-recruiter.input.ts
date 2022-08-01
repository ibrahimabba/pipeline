import { CreateRecruiterInput } from './create-recruiter.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRecruiterInput extends PartialType(CreateRecruiterInput) {
  id: string;
}
