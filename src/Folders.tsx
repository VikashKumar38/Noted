import { useEffect, useState } from "react";
import { foldermodel } from "./foldermodel";
import { AxiosApi } from "./ApiBaseUrl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RotateLoader } from "react-spinners";

type eventPosition = {
  pageX: number;
  pageY: number;
  folderId: string;
  folderName: string;
};
type seTfolderprops = {
  handleSetCurrentFolder: (id: string, name: string) => void;
};

export const Folders = ({ handleSetCurrentFolder }: seTfolderprops) => {
  const [folderList, setFolders] = useState<foldermodel[]>([]);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState<eventPosition | null>(null);
  const [editedFolderName, setFolderName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [editedFolderId, setEditedFolderId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { folderId } = useParams();
  const location = useLocation();
  useEffect(() => {
    const fetchRecents = async () => {
      try {
        const response = await AxiosApi.get("/folders");
        setFolders(response.data.folders);
        if (!selectedFolder && response.data.folders.length > 0) {
          setSelectedFolder(response.data.folders[0].id);
        }
        // ✅ Only navigate if no folder is selected in the URL
        if (!folderId && !location.search.includes("folderName")) {
          navigate(
            `/folders/${response.data.folders[0].id}/${response.data.folders[0].name}`
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecents();
  }, [folderId, location.search, navigate, selectedFolder]); // ✅ Added dependencies

  const onclickNavigate = (id: string, name: string) => {
    navigate(`/folders/${id}/${name}`);
  };

  const onClickHandler = async () => {
    try {
      const newFolder = { name: "New Folder" };
      await AxiosApi.post("/folders", newFolder);

      const response = await AxiosApi.get("/folders");

      setFolders(response.data.folders);
      handleSetCurrentFolder(folderList[0].id, folderList[0].name);
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
      setPosition({
        pageX: e.pageX,
        pageY: e.pageY,
        folderId: id,
        folderName: name,
      });
    else if (e.button === 0) {
      console.log("idddd", id);

      setSelectedFolder(id);
      handleSetCurrentFolder(id, name);
    }
  };

  const onCHangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const OnClickEdit = (id: string, name: string) => {
    setIsEditing(true);
    setFolderName(name); // Set the folder name to be edited
    setEditedFolderId(id); // Track which folder is being edited
  };

  const onSaveEdit = async () => {
    if (editedFolderId && editedFolderName) {
      try {
        await AxiosApi.patch(`/folders/${editedFolderId}`, {
          name: editedFolderName, // Send the updated folder name
        });

        const response = await AxiosApi.get("/folders");
        setFolders(response.data.folders);

        setIsEditing(false); // Exit edit mode after saving
        setPosition(null); // Close the context menu
        setEditedFolderId(null); // Clear the edited folder ID
      } catch (error) {
        console.error("Error updating folder", error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSaveEdit(); // Call save when Enter is pressed
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
    <div
      className="flex flex-col gap-y-4 max-h-[500px] overflow-y-scroll overflow-x-hidden  [&::-webkit-scrollbar]:w-1
  dark:[&::-webkit-scrollbar-track] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <div className="flex justify-between pr-6">
        <h5 className="text-sm text-[#FFFFFF99] pl-2.5">Folders</h5>
        <img
          className="cursor-pointer"
          onClick={onClickHandler}
          src="/src/assets/add-folder-icon.svg"
          alt="add folder"
        />
      </div>
      {loading && (
        <div className="flex items-center h-full justify-center">
          <RotateLoader color="gray" size={20} />
        </div>
      )}
      <div className="flex flex-col gap-y-4">
        {folderList.map((item) => (
          <li
            onClick={() => onclickNavigate(item.id, item.name)}
            key={item.id}
            className="flex"
          >
            <div
              className={`flex gap-x-3 w-full pt-1 pb-1 pl-2.5 hover:bg-[#FFFFFF08] ${
                selectedFolder === item.id
                  ? "bg-[#FFFFFF08] text-[#FFFFFF]"
                  : "bg-transparent"
              }`}
            >
              {isEditing && editedFolderId === item.id ? (
                <input
                  type="text"
                  value={editedFolderName}
                  onChange={onCHangeHandler}
                  onKeyDown={handleKeyDown}
                  className="text-[#FFFFFF99] text-sm border border-solid-black"
                />
              ) : selectedFolder === item.id ? (
                // When selectedFolder matches item.id, render different img and span
                <>
                  <img
                    className="cursor-pointer"
                    onMouseDown={(e) =>
                      onMouseDownHandler(e, item.id, item.name)
                    }
                    src="/src/assets/open-folder-icon.svg" // Change to selected icon
                    alt="Selected Folder Icon"
                  />
                  <span
                    onMouseDown={(e) =>
                      onMouseDownHandler(e, item.id, item.name)
                    }
                    className="text-white text-sm cursor-pointer font-bold"
                  >
                    {item.name}
                  </span>
                </>
              ) : (
                <>
                  <img
                    className="cursor-pointer"
                    onMouseDown={(e) =>
                      onMouseDownHandler(e, item.id, item.name)
                    }
                    src="/src/assets/noneSelected-folder-icon.svg"
                    alt="Folder Icon"
                  />
                  <span
                    onMouseDown={(e) =>
                      onMouseDownHandler(e, item.id, item.name)
                    }
                    className="text-[#FFFFFF99] text-sm cursor-pointer"
                  >
                    {item.name}
                  </span>
                </>
              )}
            </div>
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
              onClick={() =>
                OnClickEdit(position.folderId, position.folderName)
              }
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
