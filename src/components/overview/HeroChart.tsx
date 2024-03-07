import { useLastYearProjects } from "@/utils/actions";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "../ui/skeleton";

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

function HeroChart() {
  const { data: projects, isFetched } = useLastYearProjects();

  const getMonths = (): Month[] => {
    const monthNames: Month[] = [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ];
    return monthNames;
  };
  const monthNames = getMonths();

  const monthlySums: { [key in Month]: number } = {
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
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    let newMonthIndex = monthIndex - 3;
    if (newMonthIndex < 0) {
      newMonthIndex += 12;
    }

    return monthNames[newMonthIndex];
  };
  projects?.forEach((project) => {
    const monthName = getMonthName(project.created_at);

    monthlySums[monthName] += project.price;
  });
  const data = monthNames.map((name) => ({ name, value: monthlySums[name] }));
  if (!isFetched) {
    return <Skeleton className="h-[420px] w-[100%] rounded-xl" />;
  }

  return (
    <Card className="w-[70%] p-4 space-t-4">
      <div className="space-y-2 px-9">
        <CardTitle>Overview</CardTitle>
        <CardDescription>Last year incomes</CardDescription>
      </div>
      <CardContent>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#a3a3a3" dataKey="name" />
            <YAxis stroke="#a3a3a3" unit="$" />
            <Bar radius={5} barSize={30} dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default HeroChart;
