"use client";

import JobTableRow from "@/components/custom/JobTableRow";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchJobApplications } from "@/services/jobs";
import { Job } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface JobApplicationsResponse {
  jobs: Job[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

const DashBoardPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useQuery<JobApplicationsResponse, Error>({
    queryKey: ["jobApplications", page, pageSize],
    queryFn: () => fetchJobApplications({ page, pageSize }),
  });

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Expected Salary</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            [...Array(8)].map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-right">
                  <Skeleton className="h-5 w-[100px] ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-5 w-[100px] ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-5 w-[100px] ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-5 w-[100px] ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={3}>Error fetching jobs</TableCell>
            </TableRow>
          ) : (
            data?.jobs?.map((job) => <JobTableRow job={job} key={job.id} />)
          )}
        </TableBody>
      </Table>
      <Pagination className="mt-5 min-w-[405px]">
        <PaginationContent>
          <PaginationItem>
            {page !== 1 && (
              <PaginationPrevious
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
              />
            )}
          </PaginationItem>
          {data &&
            [...Array(data.totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setPage(i + 1)}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem>
            {page !== data?.totalPages && (
              <PaginationNext
                onClick={() =>
                  setPage((old) =>
                    data?.totalPages && old < data.totalPages ? old + 1 : old,
                  )
                }
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default DashBoardPage;
