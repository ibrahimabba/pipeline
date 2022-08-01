import { Test, TestingModule } from '@nestjs/testing';
import { RecruitersResolver } from './recruiters.resolver';
import { RecruitersService } from './recruiters.service';

describe('RecruitersResolver', () => {
  let resolver: RecruitersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecruitersResolver, RecruitersService],
    }).compile();

    resolver = module.get<RecruitersResolver>(RecruitersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
