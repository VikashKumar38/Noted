import { Folders } from "../Folders";
import { Recents } from "./Recents";

const SideBar = () => {
  return (
    <nav className=" flex flex-col w-[20%] h-full bg-[#181818;] pt-5 gap-y-7">
      <div className="flex justify-between items-center pl-4 pr-6">
        <img src="./src/assets/Group 1.svg" alt="Nowted-Icon" />
        <img src="./src/assets/search-icon.svg" alt="search-icon" />
      </div>
      <div className=" flex items-center justify-center ">
        <img className="w-[85%]" src="./src/assets/NewNote.svg" alt="" />
      </div>
      <div>
        <div className="flex flex-col">
          <Recents />
        </div>
      </div>
      <div>
        <Folders />
      </div>
      <div className="flex flex-col gap-2.5">
        <h5 className="pl-2.5 text-xs text-[#FFFFFF99]">More</h5>
        <div className="flex flex-col gap-y-3">
          <div className="flex gap-x-3 pl-2.5">
            <img src="./src/assets/star-icon.svg" alt="star-icon" />
            <span className="text-[#FFFFFF99]">Favorites</span>
          </div>
          <div className="flex gap-x-3 pl-3">
            <img src="./src/assets/trash-icon.svg" alt="trash-icon" />
            <span className="text-[#FFFFFF99]">Trash</span>
          </div>
          <div className="flex gap-x-3 pl-2.5">
            <img src="./src/assets/archived-icon.svg" alt="Archived-icon" />
            <span className="text-[#FFFFFF99]">Archived Notes</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default SideBar;
