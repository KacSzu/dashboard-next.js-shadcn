import { LuBarChart4, LuBriefcase, LuDollarSign } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatCurrency } from "@/utils/utils";
interface ICardGroup {
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
  count: number | null | undefined;
}
function CardGroup({ projects, count }: ICardGroup) {
  const activeProjects =
    projects?.filter((project) => project.status === "active").length ?? 0;
  const totalEarned = projects?.reduce((acc, curr) => acc + curr.price, 0) ?? 0;
  const CARD_GROUP = [
    {
      title: "Total orders",
      description: "since 2k22",
      content: count,
      icon: <LuBriefcase className="w-6 h-6" />,
    },
    {
      title: "Total earned",
      description: "total",
      content: formatCurrency(totalEarned),
      icon: <LuDollarSign className="w-6 h-6" />,
    },
    {
      title: "Active projects",
      description: "idk ",
      content: activeProjects,
      icon: <LuBarChart4 className="w-6 h-6" />,
    },
    {
      title: "Total orders",
      description: "total",
      content: "424",
      icon: <LuBriefcase className="w-6 h-6" />,
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex gap-2">
        {CARD_GROUP.map(({ title, description, content, icon }) => (
          <Card key={title + description} className="w-[250px]">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <span>{title}</span>
                </div>
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-primary text-2xl">{content}</span>
                <div className="bg-primary text-white py-3 px-3 rounded-full">
                  {icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardGroup;
