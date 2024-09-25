import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { JobFromDB, JobStatus } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useModal } from "@/store/use-modal-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "@/services/jobs";
import { toast } from "sonner";

// Utility function to format the job status
const formatJobStatus = (status: JobStatus): string => {
  const statusMap: Record<JobStatus, string> = {
    [JobStatus.Applied]: "Applied",
    [JobStatus.GotResponse]: "Got Response",
    [JobStatus.GotInterview]: "Got Interview",
    [JobStatus.FailedInterview]: "Failed Interview",
    [JobStatus.Rejected]: "Rejected",
    [JobStatus.GotOffer]: "Got Offer",
  };
  return statusMap[status] || status;
};

interface JobTableRowProps {
  job: JobFromDB;
}

export const JobTableRow: React.FC<JobTableRowProps> = ({ job }) => {
  const { onOpen } = useModal();
  const queryClient = useQueryClient();

  const deleteJobMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
    onError: (error) => {
      console.error("Failed to delete job application:", error);
    },
  });

  const handleDelete = async () => {
    toast.promise(deleteJobMutation.mutateAsync(job.ID), {
      loading: "Deleting job...",
      success: "Job deleted successfully",
      error: "Failed to delete job application",
    });
  };

  return (
    <TableRow>
      <TableCell className="capitalize">{job.Role}</TableCell>
      <TableCell className="capitalize">{job.CompanyName}</TableCell>
      <TableCell className="capitalize">{job.ExpectedSalary}</TableCell>
      <TableCell className="capitalize">
        {formatJobStatus(job.Status)}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onOpen("editJobModal", { job })}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default JobTableRow;
