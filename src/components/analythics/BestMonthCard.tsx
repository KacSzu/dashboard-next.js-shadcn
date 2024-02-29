import { Card, CardContent, CardTitle } from "../ui/card";
import CountUp from "react-countup";
function BestMonthCard() {
  return (
    <Card className="w-[330px] p-4">
      <CardTitle>Best month</CardTitle>
      <CardContent className="mt-5 space-y-7">
        <div className="text-center space-y-2">
          <p className="text-xl">Most earned: Dec 2022</p>
          <p className="text-primary text-5xl font-bold">
            <div className="space-x-1">
              <CountUp end={12052} duration={5} />
              <span>zł</span>
            </div>
          </p>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl">Most projects: Jun 2023</p>
          <p className="text-primary text-5xl font-bold">
            <div className="space-x-1">
              <CountUp end={25} duration={5} />
            </div>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default BestMonthCard;
