import FolderView from "./folderview";
import Displayview from "./displayview";
import SideBar from "./sidebar";
import { useState } from "react";
import { foldermodel } from "../foldermodel";
import { Routes, Route } from "react-router-dom";
import { Folders } from "../Folders";
import { Recents } from "./Recents";
import { More } from "../More";
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

const MainComponent = () => {
  const [currentFolderId, setCurrentFolderID] = useState<Folder>({
    id: "",
    name: "",
  });

  const [isNewNoteClicked, setNewNoteClicked] = useState<boolean>(false);

  const handleSetCurrentFolder = (id: string, name: string) => {
    setCurrentFolderID({ id: id, name: name });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-[#181818] h-[100%] flex overflow-hidden">
            <SideBar
              handleSetCurrentFolder={handleSetCurrentFolder}
              setNewNoteClicked={setNewNoteClicked}
            />
            <FolderView />
            <Displayview
              isNewNoteClicked={isNewNoteClicked}
              setNewNoteClicked={setNewNoteClicked}
              currentfolderid={currentFolderId.id}
            />
          </div>
        }
      >
        <Route
          path="recents/:folderId/:folderName/:noteID"
          element={<Recents />}
        ></Route>
        <Route
          path="folders/:folderId/:folderName"
          element={<Folders handleSetCurrentFolder={handleSetCurrentFolder} />}
        ></Route>

        <Route path="more/extranotes?/:noteID?" element={<More />} />
      </Route>
    </Routes>
  );
};
export default MainComponent;
