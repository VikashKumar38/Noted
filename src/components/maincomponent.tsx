import FolderView from "./folderview";
import Displayview from "./displayview";
import SideBar from "./sidebar";

const MainComponent = () => {
  return (
    <div className="bg-[#181818] h-dvh flex">
      <SideBar />
      <FolderView />
      <Displayview />
    </div>
  );
};
export default MainComponent;
