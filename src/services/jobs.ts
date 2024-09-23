import { API_URL } from "@/lib/config";
import { Job } from "@/types";
import axios from "axios";

interface JobApplicationsResponse {
  jobs: Job[];
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
