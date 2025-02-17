import FolderView from "./folderview";
import Displayview from "./displayview";
import SideBar from "./sidebar";
import { useState } from "react";
import { foldermodel } from "../foldermodel";

type Folder = {
  id: string;
  name: string;
};
export type Note = {
  id: string;
  folderId: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  folder: foldermodel;
};
export type folderProps = {
  folder: Folder;
  onNoteSelect: (note: Note | undefined) => void;
  selectedMoreOption: string;
  searchContent: string;
};

const MainComponent = () => {
  const [currentFolderId, setCurrentFolderID] = useState<Folder>({
    id: "",
    name: "",
  });

  const [notesData, setNoteData] = useState<Note | undefined>(undefined);
  const [selectedNoteID, setSelectedNoteID] = useState<string | null>(null);
  const [selectedMoreOption, setSelectedMoreOption] = useState<string>("");
  const [isNewNoteClicked, setNewNoteClicked] = useState<boolean>(false);
  const [searchContent, setSearchContent] = useState("");

  const handleNoteSelection = (note: Note | undefined) => {
    setNoteData(note);
    setSelectedNoteID(note ? note.id : null);
  };

  const handleSetCurrentFolder = (id: string, name: string) => {
    setCurrentFolderID({ id: id, name: name });
    setSelectedMoreOption("");
  };

  console.log("Selected Note ID:", selectedNoteID);
  console.log("Current Note Data:", notesData);

  return (
    <div className="bg-[#181818] h-[100%] flex overflow-hidden">
      <SideBar
        setCurrentFolderID={handleSetCurrentFolder}
        setSelectedNoteID={setSelectedNoteID}
        handleNoteSelection={handleNoteSelection}
        setSelectedMoreOption={setSelectedMoreOption}
        setNewNoteClicked={setNewNoteClicked}
        setSearchContent={setSearchContent}
        searchContent={searchContent}
      />
      <FolderView
        folder={currentFolderId}
        onNoteSelect={handleNoteSelection}
        selectedMoreOption={selectedMoreOption}
        searchContent={searchContent}
      />
      <Displayview
        note={notesData}
        isNewNoteClicked={isNewNoteClicked}
        setNewNoteClicked={setNewNoteClicked}
        currentfolderid={currentFolderId.id}
      />
    </div>
  );
};
export default MainComponent;
