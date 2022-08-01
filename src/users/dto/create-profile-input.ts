/* eslint-disable prettier/prettier */
export class ProfileInput {
  bio: string;
  image: string;
  skills: [string];
  workExperience: [WorkExperienceInput];
  education: [EducationInput];
  projects: [ProjectInput];
}

class WorkExperienceInput {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

class EducationInput {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

class ProjectInput {
  name: string;
  description: string;
  image: string;
  url: string;
  github: string;
  startDate: string;
  endDate: string;
}
