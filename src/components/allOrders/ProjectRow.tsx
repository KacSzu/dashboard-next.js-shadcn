// components/ProjectRow.tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import UpdateProjectModal from "./UpdateProjectModal";
import { HiOutlineTrash } from "react-icons/hi2";
import { formatCurrency, trimZerosFromCurrency } from "@/utils/utils";

interface IProjectRowProps {
  project: {
    id: number;
    avatar: string;
    created_at: string;
    projectType: string;
    name: string;
    email: string;
    price: number;
    status: string;
  };
  deleteProject: (id: number) => void;
}

const ProjectRow = ({ project, deleteProject }: IProjectRowProps) => {
  return (
    <TableRow key={project.id}>
      <TableCell className="text-left">
        <Avatar>
          <AvatarImage src={project.avatar} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{project.projectType}</TableCell>
      <TableCell>{project.name}</TableCell>
      <TableCell>{project.email}</TableCell>
      <TableCell>
        {trimZerosFromCurrency(formatCurrency(project.price))}
      </TableCell>
      <TableCell className="capitalize">{project.status}</TableCell>
      <TableCell className="flex justify-end items-center py-6">
        <UpdateProjectModal project={project} />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button>
              <HiOutlineTrash className="ml-4 h-5 w-5 cursor-pointer" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                project and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteProject(project.id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
