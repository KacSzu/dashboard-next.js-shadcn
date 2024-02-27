"use client";

import { Card, CardContent, CardTitle } from "./ui/card";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "Jan",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    pv: 4300,
    amt: 2100,
  },
];
const colors = {
  totalOrders: { stroke: "#f87171", fill: "#f87171" },
  totalEarned: { stroke: "#4ade80", fill: "#4ade80" },
  text: "#262626",
  background: "#fff",
};
function HeroChart() {
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
              <Bar radius={5} barSize={30} dataKey="pv" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeroChart;
