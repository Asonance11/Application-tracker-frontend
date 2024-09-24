"use client";

import { useModal } from "@/store/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { JobStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editJob } from "@/services/jobs";
import { toast } from "sonner";
import { Loading } from "../common/Loaders";

const formSchema = z.object({
  role: z.string().min(1, {
    message: "Job role cannot be empty",
  }),
  companyName: z.string().min(1, {
    message: "Company name cannot be empty",
  }),
  expectedSalary: z.number({
    required_error: "Salary cannot be empty",
  }),
  status: z.nativeEnum(JobStatus),
});

const EditJobModal = () => {
  const queryClient = useQueryClient();

  const { isOpen, type, data, onClose } = useModal();

  const isModalOpen = isOpen && type === "editJobModal";

  const { job } = data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      companyName: "",
      expectedSalary: 0,
      status: job?.Status || JobStatus.Applied,
    },
  });

  useEffect(() => {
    if (job) {
      form.setValue("role", job.Role);
      form.setValue("companyName", job.CompanyName);
      form.setValue("expectedSalary", job.ExpectedSalary);
      form.setValue("status", job.Status);
    }
  }, [form, job]);

  const mutation = useMutation({
    mutationFn: editJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      toast.success("Job updated successfully");
      handleClose();
    },
    onError: (error) => {
      console.error("Failed to update job application:", error);
      toast.error("Failed to update job application");
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutation.mutate({ ...values, id: job?.ID });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Job Application</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? null : Number(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(JobStatus).map(([key, value]) => (
                        <SelectItem key={value} value={value}>
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Loading /> : "Edit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;
