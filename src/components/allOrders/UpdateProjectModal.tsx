import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import UpdateProjectForm from "./UpdateProjectForm";
interface IUpdateProjectModal {
  project: {
    avatar: string;
    created_at: string;
    email: string;
    id: number;
    name: string;
    price: number;
    projectType: string;
    status: string;
  };
}
export default function UpdateProjectModal({ project }: IUpdateProjectModal) {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <HiOutlinePencilSquare className="  h-5 w-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update project</DialogTitle>
          <DialogDescription>Make sure to fill every inputs.</DialogDescription>
        </DialogHeader>
        <UpdateProjectForm project={project} onClose={handleOpen} />
      </DialogContent>
    </Dialog>
  );
}
