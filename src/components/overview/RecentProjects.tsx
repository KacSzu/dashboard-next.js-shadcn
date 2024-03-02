import { formatCurrency, trimZerosFromCurrency } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardTitle } from "../ui/card";

interface IActiveOrders {
  projects:
    | {
        avatar: string;
        created_at: string;
        email: string;
        id: number;
        name: string;
        price: number;
        projectType: string;
        status: string;
      }[]
    | null
    | undefined;
}
function RecentProjects({ projects }: IActiveOrders) {
  return (
    <div className="w-[29%] ">
      <Card className="p-4 h-full ">
        <CardTitle>Recent projects</CardTitle>
        <CardContent className="p-0 mt-5 flex flex-col  divide-y divide-y-muted-foreground">
          {projects?.map(({ avatar, name, email, price }, i) => (
            <div
              key={i}
              className="flex justify-between mt-1 space-y-3 space-x-2 items-center"
            >
              <Avatar>
                <AvatarImage src={avatar} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <p>{name}</p>
                <span className="text-xs text-muted-foreground">{email}</span>
              </div>
              <div className="text-primary min-w-[65px] flex justify-end ">
                {"+" + trimZerosFromCurrency(formatCurrency(price))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default RecentProjects;
