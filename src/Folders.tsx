import axios from "axios";
import { useEffect, useState } from "react";
import { foldermodel } from "./foldermodel";

type eventPosition = {
  pageX: number;
  pageY: number;
  folderId: string;
};
type SideBarProps = {
  setCurrentFolderID: (id: string, name: string) => void;
};
export const Folders = ({ setCurrentFolderID }: SideBarProps) => {
  const [folderList, setFolders] = useState<foldermodel[]>([]);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState<eventPosition | null>(null);
  const [editedFolderName, setFolderName] = useState<string>();

  useEffect(() => {
    const fetchRecents = async () => {
      try {
        const response = await axios.get("api/folders");
        setFolders(response.data.folders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecents();
  }, [folderList]);

  const onClickHandler = async () => {
    try {
      const newFolder = { name: "New Folder" };
      await axios.post("/api/folders", newFolder);

      const response = await axios.get("/api/folders");

      setFolders(response.data.folders);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };
  const onMouseDownHandler = (
    e: React.MouseEvent,
    id: string,
    name: string
  ) => {
    if (e.button === 2)
      setPosition({ pageX: e.pageX, pageY: e.pageY, folderId: id });
    else if (e.button === 0) {
      setCurrentFolderID(id, name);
    }
  };
  const onCHangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };
  const OnClickEdit = async () => {
    try {
      <input type="text" value={editedFolderName} onChange={onCHangeHandler} />;

      // const response = await axios.patch(`/api/folders/${position?.folderId}`);
    } catch (error) {
      console.log("Error updating folder", error);
    }
  };
  const onMouseOutHandler = () => setPosition(null);

  const onClickDelete = async () => {
    try {
      await axios.delete(`/api/folders/${position?.folderId}`);

      const response = await axios.get("api/folders");
      setFolders(response.data.folders);
    } catch (error) {
      console.log("error in deleting", error);
    }
  };
  return (
    <div
      onMouseOut={onMouseOutHandler}
      className=" flex flex-col gap-y-4 pl-2.5"
    >
      <div className=" flex justify-between pr-6 ">
        <h5 className="text-sm text-[#FFFFFF99] ">Folders</h5>
        <img
          className="cursor-pointer"
          onClick={onClickHandler}
          src="./src/assets/add-folder-icon.svg"
          alt="add folder"
        />
      </div>
      {loading && <p className="text-gray-400 text-">Loading...</p>}
      <div className="flex flex-col gap-4">
        {folderList.map((item) => (
          <li key={item.id} className="flex gap-x-3 gap-y-3">
            <img
              className="cursor-pointer"
              onMouseDown={(e) => onMouseDownHandler(e, item.id, item.name)}
              src="src/assets/noneSelected-folder-icon.svg"
              alt="Reflection Icon"
            />
            <span
              onMouseDown={(e) => onMouseDownHandler(e, item.id, item.name)}
              className="text-[#FFFFFF] text-sm cursor-pointer"
            >
              {item.name}
            </span>
          </li>
        ))}
        {position && (
          <div
            className="absolute bg-gray-900 text-white p-2 rounded-md shadow-lg flex justify-between"
            style={{ top: position.pageY, left: position.pageX }}
          >
            <button
              className="block w-full text-left p-2 hover:bg-gray-700"
              onClick={OnClickEdit}
            >
              Edit
            </button>
            <button
              className="block w-full text-left p-2 hover:bg-red-600"
              onClick={onClickDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
