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
};

const MainComponent = () => {
  const [currentFolderId, setCurrentFolderID] = useState<Folder>({
    id: "",
    name: "",
  });

  const [notesData, setNoteData] = useState<Note | undefined>(undefined);
  const [selectedNoteID, setNoteID] = useState<string | null>(null);

  const handleNoteSelection = (note: Note | undefined) => {
    setNoteData(note);
    setNoteID(note ? note.id : null);
  };

  const handleSetCurrentFolder = (id: string, name: string) => {
    setCurrentFolderID({ id: id, name: name });
  };

  console.log("Selected Note ID:", selectedNoteID);
  console.log("Current Note Data:", notesData);   

  return (
    <div className="bg-[#181818] h-[100%] flex">
      <SideBar
        setCurrentFolderID={handleSetCurrentFolder}
        setSelectedNoteID={setNoteID}
        handleNoteSelection={handleNoteSelection}
      />
      <FolderView folder={currentFolderId} onNoteSelect={handleNoteSelection} />
      <Displayview note={notesData} />
    </div>
  );
};
export default MainComponent;
