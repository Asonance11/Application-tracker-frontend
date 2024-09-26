import { API_URL } from "@/lib/config";
import { JobFromDB, JobInput } from "@/types";
import axios from "axios";

interface JobApplicationsResponse {
  jobs: JobFromDB[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

interface FetchJobApplicationsParams {
  page?: number;
  pageSize?: number;
}

export const fetchJobApplications = async ({
  page = 1,
  pageSize = 10,
}: FetchJobApplicationsParams): Promise<JobApplicationsResponse> => {
  const response = await axios.get(`${API_URL}/api/jobs`, {
    params: { page, pageSize },
    withCredentials: true,
  });
  return response.data;
};

export const createJob = async (values: JobInput) => {
  const response = await axios.post(
    `${API_URL}/api/jobs`,
    {
      role: values.role,
      companyName: values.companyName,
      expectedSalary: values.expectedSalary,
    },
    { withCredentials: true },
  );

  return response.data;
};

export const editJob = async (values: JobInput) => {
  const response = await axios.put(
    `${API_URL}/api/jobs/${values.id}`,
    {
      role: values.role,
      companyName: values.companyName,
      expectedSalary: values.expectedSalary,
      status: values.status,
    },
    { withCredentials: true },
  );

  return response.data;
};

export const deleteJob = async (id: number) => {
  const response = await axios.delete(`${API_URL}/api/jobs/${id}`, {
    withCredentials: true,
  });

  return response.data;
};
