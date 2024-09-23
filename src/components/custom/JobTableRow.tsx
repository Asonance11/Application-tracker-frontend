import { TableCell, TableRow } from "@/components/ui/table";
import { Job } from "@/types";

interface JobTableRowProps {
  job: Job;
}

export const JobTableRow: React.FC<JobTableRowProps> = ({ job }) => {
  return (
    <TableRow>
      <TableCell>{job.role}</TableCell>
      <TableCell>{job.companyName}</TableCell>
      <TableCell>{job.expectedSalary}</TableCell>
      <TableCell>{job.status}</TableCell>
    </TableRow>
  );
};

export default JobTableRow;
