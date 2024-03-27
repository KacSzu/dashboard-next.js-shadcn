import { Project } from "../Dashboard";
import CardGroup from "./CardGroup";
import HeroChart from "./HeroChart";
import RecentProjects from "./RecentProjects";
interface IOverviewTab {
  projects: Project[] | undefined;
  count: number | null | undefined;
}
function OverviewTab({ projects, count }: IOverviewTab) {
  return (
    <div className="space-y-1">
      <section>
        <CardGroup projects={projects} count={count} />
      </section>
      <section className="grid grid-cols-12 gap-1 ">
        <div className="col-span-8 ">
          <HeroChart />
        </div>
        <div className="col-span-4  ">
          <RecentProjects projects={projects?.slice(0, 5)} />
        </div>
      </section>
    </div>
  );
}

export default OverviewTab;
