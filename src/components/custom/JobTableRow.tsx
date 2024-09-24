import { TableCell, TableRow } from "@/components/ui/table";
import { Job, JobFromDB } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

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
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default JobTableRow;
