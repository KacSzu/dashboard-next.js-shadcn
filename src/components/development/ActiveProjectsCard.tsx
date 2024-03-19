import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WaitingProject from "./WaitingProject";
import { useProjectsFiltredByStatus } from "@/utils/actions";
import ActiveProject from "./ActiveProject";
import Loader from "../Loader";

function ActiveProjectsCard() {
  const { data: projects, isLoading } = useProjectsFiltredByStatus("active");
  if (isLoading) return <Loader />;
  return (
    <Card className="col-span-6 h-[596px] overflow-y-auto">
      <CardHeader>
        <CardTitle>Active projects</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col  divide-y divide-y-muted-foreground">
        {projects?.map(({ avatar, email, name, id }, i) => (
          <ActiveProject
            avatar={avatar}
            email={email}
            name={name}
            projectId={id}
            key={i}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default ActiveProjectsCard;
