"use client";

import { useLastYearProjects } from "@/lib/actions";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "../ui/skeleton";

function HeroChart() {
  const { data: projects, error, isFetched } = useLastYearProjects();
  type Month =
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Okt"
    | "Nov"
    | "Dec";

  const monthlySums: { [K in Month]: number } = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Okt: 0,
    Nov: 0,
    Dec: 0,
  };

  const getMonthName = (dateString: string): Month => {
    const monthNames: Month[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateString);
    return monthNames[date.getMonth()];
  };

  projects?.forEach((project) => {
    const monthName = getMonthName(project.created_at);
    monthlySums[monthName] += project.price;
  });

  const data = Object.entries(monthlySums).map(([name, value]) => ({
    name,
    value,
  }));

  if (!isFetched) {
    return <Skeleton className="h-[420px] w-[100%] rounded-xl" />;
  }

  return (
    <Card className="w-[70%] p-4 space-y-5">
      <CardTitle>Overview</CardTitle>
      <CardContent>
        <div>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis stroke="#a3a3a3" dataKey="name" />
              <YAxis stroke="#a3a3a3" unit="zł" />
              <Bar radius={5} barSize={30} dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeroChart;
