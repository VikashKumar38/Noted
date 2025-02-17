import { Folders } from "../Folders";
import { Note } from "./maincomponent";
import { Recents } from "./Recents";
import { More } from "../More";
import { useState } from "react";

export type SideBarProps = {
  setCurrentFolderID: (id: string, name: string) => void;
  setSelectedNoteID: (id: string | null) => void;
  handleNoteSelection: (note: Note | undefined) => void;
  setSelectedMoreOption: (name: string) => void;
  setNewNoteClicked: (isclicked: boolean) => void;
  setSearchContent: (content: string) => void;
  searchContent: string;
};

const SideBar = ({
  setCurrentFolderID,
  setSelectedNoteID,
  handleNoteSelection,
  setSelectedMoreOption,
  setNewNoteClicked,
  setSearchContent,
  searchContent,
}: SideBarProps) => {
  const [isSearchedClicked, setIsSearchClicked] = useState(false);
  const onclickHandler = () => {
    setNewNoteClicked(true);
  };
  const onClickSearch = () => {
    setIsSearchClicked((prev) => !prev);
  };
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  return (
    <nav className=" flex flex-col w-[20%] h-full bg-[#181818;] pt-5 gap-y-7">
      <div className="flex justify-between items-center pl-4 pr-6">
        <img src="./src/assets/Group 1.svg" alt="Nowted-Icon" />
        <img
          className="cursor-pointer"
          onClick={onClickSearch}
          src="./src/assets/search-icon.svg"
          alt="search-icon"
        />
      </div>
      <div className=" flex items-center justify-center ">
        {!isSearchedClicked ? (
          <img
            onClick={onclickHandler}
            className="w-[88%] cursor-pointer"
            src="./src/assets/NewNote.svg"
            alt="newNote"
          />
        ) : (
          <div className="w-full flex items-center justify-center">
            <input
              type="text"
              className=" bg-[#FFFFFF0D] w-[80%] pt-2 pb-2 pl-2 items-center justify-center rounded-md outline-none"
              placeholder="search note"
              value={searchContent}
              onChange={onChangeSearch}
            />
          </div>
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <Recents
            setSelectedNoteID={setSelectedNoteID}
            handleNoteSelection={handleNoteSelection}
          />
        </div>
      </div>
      <div>
        <Folders setCurrentFolderID={setCurrentFolderID} />
      </div>
      <More setSelectedMoreOption={setSelectedMoreOption} />
    </nav>
  );
};
export default SideBar;
