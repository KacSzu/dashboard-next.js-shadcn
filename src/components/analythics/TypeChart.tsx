import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { Card, CardTitle } from "../ui/card";

function TypeChart() {
  const data = [
    {
      subject: "Application",
      A: 98,
    },

    {
      subject: "Store",
      A: 86,
    },
    {
      subject: "Other",
      A: 85,
    },
    {
      subject: "Integration",
      A: 99,
    },
    {
      subject: "Web Page",
      A: 120,
    },
  ];

  return (
    <Card className="w-1/3 p-4">
      <CardTitle>Types</CardTitle>
      <RadarChart outerRadius={90} width={340} height={220} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={50} domain={[0, 150]} />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#22c55e"
          fill="#22c55e"
          fillOpacity={0.6}
        />
      </RadarChart>
    </Card>
  );
}

export default TypeChart;
