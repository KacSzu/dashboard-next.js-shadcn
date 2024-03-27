import { DASHBOARD_NAVIGATION } from "@/utils/constants";
import ButtonGroup from "./ButtonGroup";
import NewProjectModal from "./NewProjectModal";
interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  data: typeof DASHBOARD_NAVIGATION;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  setActiveTab,
  data,
}) => {
  return (
    <header className="mx-[12px] mt-4 flex justify-between">
      <ButtonGroup
        activeTab={activeTab}
        data={data}
        setActiveTab={setActiveTab}
      />
      <NewProjectModal />
    </header>
  );
};

export default DashboardHeader;
