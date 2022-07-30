import { Module } from '@nestjs/common';
import { RecruitersService } from './recruiters.service';
import { RecruitersResolver } from './recruiters.resolver';

@Module({
  providers: [RecruitersResolver, RecruitersService],
})
export class RecruitersModule {}
