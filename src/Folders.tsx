import axios from "axios";
import { useEffect, useState } from "react";
import { foldermodel } from "./foldermodel";
import { AxiosApi } from "./ApiBaseUrl";

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
        const response = await AxiosApi.get("/folders");
        setFolders(response.data.folders);
        setCurrentFolderID(
          response.data.folders[0].id,
          response.data.folders[0].name
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecents();
  }, []);

  const onClickHandler = async () => {
    try {
      const newFolder = { name: "New Folder" };
      await axios.post("/api/folders", newFolder);

      const response = await AxiosApi.get("/api/folders");

      setFolders(response.data.folders);
      setCurrentFolderID(folderList[0].id, folderList[0].name);
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

  const onClickDelete = async () => {
    try {
      await AxiosApi.delete(`folders/${position?.folderId}`);

      const response = await AxiosApi.get("/folders");
      setFolders(response.data.folders);
    } catch (error) {
      console.log("error in deleting", error);
    }
  };
  return (
    <div className=" flex flex-col gap-y-4 ">
      <div className=" flex justify-between pr-6 ">
        <h5 className="text-sm text-[#FFFFFF99] pl-2.5">Folders</h5>
        <img
          className="cursor-pointer"
          onClick={onClickHandler}
          src="./src/assets/add-folder-icon.svg"
          alt="add folder"
        />
      </div>
      {loading && <p className="text-gray-400 text-">Loading...</p>}
      <div className="flex flex-col gap-y-4 ">
        {folderList.map((item, idx) => (
          <li key={item.id} className="flex ">
            {idx === 0 ? (
              <div className="flex gap-x-3 bg-[#FFFFFF08] w-full pt-1 pb-1 pl-2.5">
                <img
                  className="cursor-pointer"
                  onMouseDown={(e) => onMouseDownHandler(e, item.id, item.name)}
                  src="src/assets/open-folder-icon.svg"
                  alt="first-folder"
                />
                <span
                  onMouseDown={(e) => onMouseDownHandler(e, item.id, item.name)}
                  className="text-[#FFFFFF] text-sm cursor-pointer"
                >
                  {item.name}
                </span>
              </div>
            ) : (
              <div className="flex gap-x-3 pl-2.5">
                <img
                  className="cursor-pointer"
                  onMouseDown={(e) => onMouseDownHandler(e, item.id, item.name)}
                  src="src/assets/noneSelected-folder-icon.svg"
                  alt="Reflection Icon"
                />
                <span
                  onMouseDown={(e) => onMouseDownHandler(e, item.id, item.name)}
                  className="text-[#FFFFFF99] text-sm cursor-pointer"
                >
                  {item.name}
                </span>
              </div>
            )}
          </li>
        ))}
        {position && (
          <div
            onMouseLeave={() => setPosition(null)}
            className="absolute bg-gray-900 text-white p-2 rounded-md shadow-lg flex justify-between"
            style={{ top: position.pageY, left: position.pageX }}
          >
            <button
              className=" w-full text-left p-2 hover:bg-gray-700"
              onClick={OnClickEdit}
            >
              Edit
            </button>
            <button
              className=" w-full text-left p-2 hover:bg-red-600"
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
