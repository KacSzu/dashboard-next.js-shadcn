import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { Card, CardTitle } from "../ui/card";
interface ITypeChart {
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
interface Project {
  id: number;
  created_at: string;
  projectType: string;
  price: number;
  name: string;
  avatar: string;
  email: string;
  status: string;
}

type ProjectTypeCounts = Record<string, number>;
function TypeChart({ projects }: ITypeChart) {
  const countProjectTypes = (
    projects: Project[] | undefined
  ): ProjectTypeCounts => {
    const counts: ProjectTypeCounts = {};

    projects?.forEach((project) => {
      const { projectType } = project;
      if (counts[projectType]) {
        counts[projectType]++;
      } else {
        counts[projectType] = 1;
      }
    });

    return counts;
  };
  const projectTypeCounts = countProjectTypes(projects);
  const data = [
    {
      subject: "Application",
      A: projectTypeCounts.application,
    },

    {
      subject: "Store",
      A: projectTypeCounts.store,
    },
    {
      subject: "Other",
      A: projectTypeCounts.other,
    },
    {
      subject: "Integration",
      A: projectTypeCounts.integration,
    },
    {
      subject: "Web Page",
      A: projectTypeCounts.web_page,
    },
  ];
  return (
    <Card className="col-span-4 p-4">
      <CardTitle>Types</CardTitle>
      <RadarChart outerRadius={90} width={340} height={220} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={50} domain={[0, 10]} />
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
