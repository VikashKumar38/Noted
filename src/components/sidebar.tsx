import { Folders } from "../Folders";
import { Recents } from "./Recents";
import { More } from "../More";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type SideBarProps = {
  setNewNoteClicked: (isclicked: boolean) => void;

  handleSetCurrentFolder: (id: string, name: string) => void;
};

const SideBar = ({
  setNewNoteClicked,
  handleSetCurrentFolder,
}: SideBarProps) => {
  const [isSearchedClicked, setIsSearchClicked] = useState(false);
  const onclickHandler = () => {
    setNewNoteClicked(true);
  };
  const navigate = useNavigate();
  const onClickSearch = () => {
    setIsSearchClicked((prev) => !prev);
  };

  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    // Get existing search params
    const searchParams = new URLSearchParams(location.search);

    // Update 'search' param
    if (searchValue) {
      searchParams.set("search", searchValue);
    } else {
      searchParams.delete("search");
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <nav className=" flex flex-col w-[20%] h-full bg-[#181818;] pt-5 gap-y-7">
      <div className="flex justify-between items-center pl-4 pr-6">
        <img src="/src/assets/Group 1.svg" alt="Nowted-Icon" />
        <img
          className="cursor-pointer"
          onClick={onClickSearch}
          src="/src/assets/search-icon.svg"
          alt="search-icon"
        />
      </div>
      <div className=" flex items-center justify-center ">
        {!isSearchedClicked ? (
          <img
            onClick={onclickHandler}
            className="w-[88%] cursor-pointer"
            src="/src/assets/NewNote.svg"
            alt="newNote"
          />
        ) : (
          <div className="w-full flex items-center justify-center">
            <input
              type="text"
              className=" bg-[#FFFFFF0D] w-[80%] pt-2 pb-2 pl-2 items-center justify-center rounded-md outline-none"
              placeholder="search note"
              value={searchValue ?? ""}
              onChange={onChangeSearch}
            />
          </div>
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <Recents />
        </div>
      </div>
      <div>
        <Folders handleSetCurrentFolder={handleSetCurrentFolder} />
      </div>
      <More />
    </nav>
  );
};
export default SideBar;
