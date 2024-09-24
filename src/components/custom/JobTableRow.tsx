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
import { useModal } from "@/store/use-modal-store";

interface JobTableRowProps {
  job: JobFromDB;
}

export const JobTableRow: React.FC<JobTableRowProps> = ({ job }) => {
  const { onOpen } = useModal();

  return (
    <TableRow>
      <TableCell className="capitalize">{job.Role}</TableCell>
      <TableCell className="capitalize">{job.CompanyName}</TableCell>
      <TableCell className="capitalize">{job.ExpectedSalary}</TableCell>
      <TableCell className="capitalize">{job.Status}</TableCell>
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
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default JobTableRow;
