import { Module } from '@nestjs/common';
import { RecruitersService } from './recruiters.service';
import { RecruitersResolver } from './recruiters.resolver';
import { RecruitersRepository } from './recruiters.repository';

@Module({
  providers: [RecruitersResolver, RecruitersService, RecruitersRepository],
})
export class RecruitersModule {}
