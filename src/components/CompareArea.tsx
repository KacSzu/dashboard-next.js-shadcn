"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardTitle } from "./ui/card";
const data = [
  {
    name: "Jan",
    totalEarned: 4000,
    totalProjects: 3,
    amt: 2400,
  },
  {
    name: "Feb",
    totalEarned: 3000,
    totalProjects: 3222,
    amt: 2210,
  },
  {
    name: "Mar",
    totalEarned: 2000,
    totalProjects: 3323,
    amt: 2290,
  },
  {
    name: "Apr",
    totalEarned: 2780,
    totalProjects: 2323,
    amt: 2000,
  },
  {
    name: "May",
    totalEarned: 1890,
    totalProjects: 3333,
    amt: 2181,
  },
  {
    name: "Jun",
    totalEarned: 2390,
    totalProjects: 3532,
    amt: 2500,
  },
  {
    name: "Jul",
    totalEarned: 3490,
    totalProjects: 5000,
    amt: 2100,
  },
];
function CompareArea() {
  return (
    <Card className="mx-[11px] p-4">
      <CardTitle>Summary</CardTitle>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalEarned"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="totalProjects"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default CompareArea;
