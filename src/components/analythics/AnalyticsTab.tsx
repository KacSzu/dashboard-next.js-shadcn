import TypeChart from "./TypeChart";
import BestMonthCard from "./BestMonthCard";
import CompareArea from "./CompareArea";
import { Project } from "../Dashboard";
interface IAnalyticsTab {
  projects: Project[] | undefined;
}
const AnalyticsTab = ({ projects }: IAnalyticsTab) => {
  return (
    <div className="space-y-1">
      <section className="grid grid-cols-12 gap-1">
        <TypeChart projects={projects} />
        <BestMonthCard projects={projects} />
        <BestMonthCard projects={projects} />
      </section>
      <section className="col-span-12">
        <CompareArea />
      </section>
    </div>
  );
};

export default AnalyticsTab;
