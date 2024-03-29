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
import Loader from "../Loader";

function WaitingProjectsCard() {
  const { data: projects, isLoading } = useProjectsFiltredByStatus("waiting");
  if (isLoading) return <Loader />;
  return (
    <Card className="col-span-6 h-[596px] overflow-y-auto">
      <CardHeader>
        <CardTitle>Waiting projects</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col  divide-y divide-y-muted-foreground">
        {projects?.map(({ avatar, email, name, id }, i) => (
          <WaitingProject
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

export default WaitingProjectsCard;
