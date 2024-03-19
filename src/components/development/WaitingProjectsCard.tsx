import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WaitingProject from "./WaitingProject";

function WaitingProjectsCard() {
  return (
    <Card className="col-span-6 h-[580px]">
      <CardHeader>
        <CardTitle>Waiting projects</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col  divide-y divide-y-muted-foreground">
        <WaitingProject />
        <WaitingProject />
        <WaitingProject />
      </CardContent>
    </Card>
  );
}

export default WaitingProjectsCard;
