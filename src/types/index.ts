export interface BaseModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface User extends BaseModel {
  username: string;
  jobs: Job[];
}

export interface Job extends BaseModel {
  role: string;
  companyName: string;
  expectedSalary: number;
  status: JobStatus;
  userId: number;
}

export enum JobStatus {
  Applied = "applied",
  GotResponse = "got_response",
  GotInterview = "got_interview",
  FailedInterview = "failed_interview",
  Rejected = "rejected",
  GotOffer = "got_offer",
}

export interface UserInput {
  username: string;
  password: string;
}

export interface JobInput {
  id?: number;
  role: string;
  companyName: string;
  expectedSalary: number;
  status?: JobStatus;
}

export interface JobFromDB {
  ID: number;
  Role: string;
  CompanyName: string;
  ExpectedSalary: number;
  Status: JobStatus;
  // Add any other fields that come from the DB
}
