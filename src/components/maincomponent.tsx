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
  setNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
};
const MainComponent = () => {
  const [currentFolderId, setCurrentFolderID] = useState<Folder>({
    id: "",
    name: "",
  });
  const [notesId, setNotesId] = useState<Note | undefined>();
  const handleSetCurrentFolder = (id: string, name: string) => {
    setCurrentFolderID({ id: id, name: name });
  };
  return (
    <div className="bg-[#181818] h-dvh flex">
      <SideBar setCurrentFolderID={handleSetCurrentFolder} />
      <FolderView folder={currentFolderId} setNote={setNotesId} />
      <Displayview note={notesId} />
    </div>
  );
};
export default MainComponent;
