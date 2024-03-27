import WaitingProjectsCard from "./WaitingProjectsCard";
import ActiveProjectsCard from "./ActiveProjectsCard";

const DevelopmentTab = () => {
  return (
    <section className="grid grid-cols-12 gap-1">
      <WaitingProjectsCard />
      <ActiveProjectsCard />
    </section>
  );
};

export default DevelopmentTab;
