import { Folders } from "../Folders";
import { Note } from "./maincomponent";
import { Recents } from "./Recents";
import { More } from "../More";

export type SideBarProps = {
  setCurrentFolderID: (id: string, name: string) => void;
  setSelectedNoteID: (id: string | null) => void;
  handleNoteSelection: (note: Note | undefined) => void;
  setSelectedMoreOption: (name: string) => void;
  setNewNoteClicked: (isclicked: boolean) => void;
};

const SideBar = ({
  setCurrentFolderID,
  setSelectedNoteID,
  handleNoteSelection,
  setSelectedMoreOption,
  setNewNoteClicked,
}: SideBarProps) => {
  const onclickHandler = () => {
    setNewNoteClicked(true);
  };

  return (
    <nav className=" flex flex-col w-[20%] h-full bg-[#181818;] pt-5 gap-y-7">
      <div className="flex justify-between items-center pl-4 pr-6">
        <img src="./src/assets/Group 1.svg" alt="Nowted-Icon" />
        <img src="./src/assets/search-icon.svg" alt="search-icon" />
      </div>
      <div className=" flex items-center justify-center ">
        <img
          onClick={onclickHandler}
          className="w-[88%] cursor-pointer"
          src="./src/assets/NewNote.svg"
          alt="newNote"
        />
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
