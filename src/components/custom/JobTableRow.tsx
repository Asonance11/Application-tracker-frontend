import { TableCell, TableRow } from "@/components/ui/table";
import { Job, JobFromDB } from "@/types";

interface JobTableRowProps {
  job: JobFromDB;
}

export const JobTableRow: React.FC<JobTableRowProps> = ({ job }) => {
  return (
    <TableRow>
      <TableCell>{job.Role}</TableCell>
      <TableCell>{job.CompanyName}</TableCell>
      <TableCell>{job.ExpectedSalary}</TableCell>
      <TableCell>{job.Status}</TableCell>
    </TableRow>
  );
};

export default JobTableRow;
