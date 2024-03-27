"use client";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useLastYearProjects } from "@/utils/actions";

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
type ProjectType =
  | "web_page"
  | "store"
  | "integration"
  | "application"
  | "other";

interface Project {
  created_at: string;
  projectType: ProjectType;
  price: number;
}

interface ChartData {
  name: Month;
  web_page: number;
  store: number;
  integration: number;
  application: number;
  other: number;
}

function CompareArea() {
  const { data: projects, isFetched } = useLastYearProjects();
  const getSortedMonths = (): Month[] => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
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

    return [
      ...monthNames.slice(currentMonthIndex + 1),
      ...monthNames.slice(0, currentMonthIndex + 1),
    ];
  };

  const getInitialMonthlyData = (): Record<Month, ChartData> => {
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
    const initialData: Record<Month, ChartData> = {} as Record<
      Month,
      ChartData
    >;

    monthNames.forEach((month) => {
      initialData[month] = {
        name: month,
        web_page: 0,
        store: 0,
        integration: 0,
        application: 0,
        other: 0,
      };
    });

    return initialData;
  };

  const processData = (projects: Project[]): ChartData[] => {
    const sortedMonths = getSortedMonths();
    const monthlyData = getInitialMonthlyData();

    projects.forEach(({ created_at, projectType, price }) => {
      const month: Month = new Date(created_at).toLocaleString("en-us", {
        month: "short",
      }) as Month;
      if (monthlyData[month]) {
        monthlyData[month][projectType] += price;
      }
    });

    return sortedMonths.map((month) => monthlyData[month]);
  };

  const chartData = isFetched
    ? processData(
        (projects || []).map(({ created_at, projectType, price }) => ({
          created_at,
          projectType: projectType as ProjectType,
          price,
        }))
      )
    : [];
  return (
    <Card className=" p-4 space-y-3">
      <CardTitle>Summary</CardTitle>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorWeb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorStore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInteg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fa8072" stopOpacity={0.8} />{" "}
                <stop offset="95%" stopColor="#fa8072" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffa500" stopOpacity={0.8} />{" "}
                <stop offset="95%" stopColor="#ffa500" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOther" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#20b2aa" stopOpacity={0.8} />{" "}
                <stop offset="95%" stopColor="#20b2aa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip wrapperStyle={{ color: "#111" }} />
            <Area
              type="monotone"
              dataKey="web_page"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorWeb)"
            />
            <Area
              type="monotone"
              dataKey="store"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorStore)"
            />
            <Area
              type="monotone"
              dataKey="integration"
              stroke="#ffc658"
              fillOpacity={1}
              fill="url(#colorInteg)"
            />
            <Area
              type="monotone"
              dataKey="application"
              stroke="#a4de6c"
              fillOpacity={1}
              fill="url(#colorApp)"
            />
            <Area
              type="monotone"
              dataKey="other"
              stroke="#d0ed57"
              fillOpacity={1}
              fill="url(#colorOther)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default CompareArea;
