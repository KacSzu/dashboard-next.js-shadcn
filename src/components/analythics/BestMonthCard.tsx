import { Card, CardContent, CardTitle } from "../ui/card";
import CountUp from "react-countup";
interface Project {
  avatar: string;
  created_at: string;
  email: string;
  id: number;
  name: string;
  price: number;
  projectType: string;
  status: string;
}
interface IBestMonthCard {
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
    | undefined;
}
interface IFindMostCommonMonthAndCount {
  mostCommonMonth: string;
  maxCount: number;
}
interface IFindMostProfitableMonth {
  mostProfitableMonth: string;
  highestSum: number;
}
function BestMonthCard({ projects }: IBestMonthCard) {
  const countProjectsByMonth = (projects: Project[] | undefined) => {
    const monthCounts: Record<string, number> = {};

    projects?.forEach((project) => {
      const date = new Date(project.created_at);
      const monthYear = date.toLocaleString("en-us", {
        month: "short",
        year: "numeric",
      });

      monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
    });

    return monthCounts;
  };

  const findMostCommonMonthAndCount = (
    monthCounts: Record<string, number>
  ): IFindMostCommonMonthAndCount => {
    let maxCount = 0;
    let mostCommonMonth = "";

    Object.entries(monthCounts).forEach(([month, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonMonth = month;
      }
    });

    return { mostCommonMonth, maxCount };
  };

  const sumPricesByMonth = (projects: Project[] | undefined) => {
    const monthSums: Record<string, number> = {};

    projects?.forEach((project) => {
      const date = new Date(project.created_at);
      const monthYear = date.toLocaleString("en-us", {
        month: "short",
        year: "numeric",
      });

      if (!monthSums[monthYear]) {
        monthSums[monthYear] = 0;
      }

      monthSums[monthYear] += project.price;
    });

    return monthSums;
  };

  const findMostProfitableMonth = (
    monthSums: Record<string, number>
  ): IFindMostProfitableMonth => {
    let highestSum = 0;
    let mostProfitableMonth = "";

    Object.entries(monthSums).forEach(([month, sum]) => {
      if (sum > highestSum) {
        highestSum = sum;
        mostProfitableMonth = month;
      }
    });

    return { mostProfitableMonth, highestSum };
  };
  const monthSums = sumPricesByMonth(projects);
  const { mostProfitableMonth, highestSum } =
    findMostProfitableMonth(monthSums);
  const monthCounts = countProjectsByMonth(projects);
  const { mostCommonMonth, maxCount } =
    findMostCommonMonthAndCount(monthCounts);
  return (
    <Card className="w-[330px] p-4">
      <CardTitle>Best month</CardTitle>
      <CardContent className="mt-5 space-y-7">
        <div className="text-center space-y-2">
          <p className="text-xl">Most earned: {mostProfitableMonth}</p>
          <div className="text-primary text-5xl font-bold">
            <div className="space-x-1">
              <CountUp end={highestSum} duration={3} />$
            </div>
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl">Most projects: {mostCommonMonth}</p>
          <div className="text-primary text-5xl font-bold">
            <div className="space-x-1">
              <CountUp end={maxCount} duration={3} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default BestMonthCard;
