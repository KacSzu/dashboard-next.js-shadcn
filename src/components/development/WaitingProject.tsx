import { useUpdateProjectStatus } from "@/utils/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Loader from "../Loader";
interface IWaitingProject {
  avatar: string;
  email: string;
  name: string;
  projectId: number;
}
function WaitingProject({ avatar, email, name, projectId }: IWaitingProject) {
  const { updateProjectStatus, isPending } = useUpdateProjectStatus();
  if (isPending) return <Loader />;
  return (
    <div className="flex justify-between mt-1 space-y-3 space-x-2 items-center">
      <Avatar>
        <AvatarImage src={avatar} alt="avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <p>{name}</p>
        <span className="text-xs text-muted-foreground">{email}</span>
      </div>
      <div className="text-primary min-w-[65px] flex justify-end ">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="secondary">
              Set as active
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  updateProjectStatus({ projectId, newStatus: "active" })
                }
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default WaitingProject;
