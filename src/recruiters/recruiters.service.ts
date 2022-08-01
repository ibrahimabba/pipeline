import { Injectable } from '@nestjs/common';
import { formatResponse } from 'src/utils';
import { generateJWT, isPasswordSame, validateJWTToken } from 'src/utils/auth';
import { env } from 'src/utils/env';
import { CreateRecruiterInput } from './dto/create-recruiter.input';
import { UpdateRecruiterInput } from './dto/update-recruiter.input';
import { RecruitersRepository } from './recruiters.repository';

@Injectable()
export class RecruitersService {
  constructor(private readonly recruitersRepository: RecruitersRepository) {}

  async signUp(createRecruiterInput: CreateRecruiterInput) {
    const userResultObj = await this.recruitersRepository.findRecruiterByEmail(
      createRecruiterInput.email,
    );

    if (userResultObj.records.length > 0) {
      throw new Error(
        `Recruiter with email ${createRecruiterInput.email} already exists`,
      );
    }

    const resultObj = await this.recruitersRepository.create(
      createRecruiterInput,
    );
    const recruiter = formatResponse(resultObj)[0];
    return {
      ...recruiter,
      authorization: generateJWT(
        { use: 'recruiter', id: recruiter.id },
        Number(env('JWT_TOKEN_EXPIRY_IN_SECONDS', false) || 40000),
      ),
    };
  }

  async logIn(email: string, password: string) {
    const userResultObj = await this.recruitersRepository.findRecruiterByEmail(
      email,
    );
    if (userResultObj.records.length === 0) {
      throw new Error(`Recruiter with email ${email} does not exist`);
    }
    const recruiter = formatResponse(userResultObj)[0];
    if (!isPasswordSame(password, recruiter.password)) {
      throw new Error(`Invalid password`);
    }
    return {
      ...recruiter,
      authorization: generateJWT(
        { use: 'recruiter', id: recruiter.id },
        Number(env('JWT_TOKEN_EXPIRY_IN_SECONDS', false) || 40000),
      ),
    };
  }

  async findOne(id: string) {
    const resultObj = await this.recruitersRepository.findOne(id);
    return formatResponse(resultObj)[0];
  }

  async update(id: string, updateRecruiterInput: UpdateRecruiterInput) {
    const resultObj = await this.recruitersRepository.update(
      id,
      updateRecruiterInput,
    );
    return formatResponse(resultObj)[0];
  }

  async remove(id: string) {
    const resultObj = await this.recruitersRepository.remove(id);
    return formatResponse(resultObj)[0];
  }

  async viewTalents() {
    const resultObj = await this.recruitersRepository.viewTalents();
    return formatResponse(resultObj);
  }

  async viewTalent(id: string) {
    const resultObj = await this.recruitersRepository.viewTalent(id);
    return formatResponse(resultObj)[0];
  }

  async validateRecruiter(conext: {
    req: { headers: { authorization?: string } };
  }) {
    const authorization = conext.req.headers.authorization;
    if (!authorization) {
      throw new Error('Authorization header is missing');
    }

    let id: any, use: any;
    try {
      const user = await validateJWTToken(authorization);
      id = user.id;
      use = user.use;
    } catch {
      throw new Error('Invalid token');
    }

    if (use !== 'recruiter') {
      throw new Error('Not allowed to access this resource');
    }

    const recruiter = await this.recruitersRepository.findOne(id);

    if (!recruiter) {
      throw new Error('Recruiter does not exist');
    }
  }
}
