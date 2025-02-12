import axios from "axios";
import { useEffect, useState } from "react";
import { foldermodel } from "./foldermodel";

export const Folders = () => {
  const [folderList, setFolders] = useState<foldermodel[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <div className=" flex flex-col gap-y-4 pl-2.5">
      <div className=" flex justify-between pr-6 ">
        <h5 className="text-xs text-[#FFFFFF99] ">Folders</h5>
        <img src="./src/assets/add-folder-icon.svg" alt="add folder" />
      </div>
      {loading && <p className="text-gray-400 text-">Loading...</p>}
      <div className="flex flex-col gap-4">
        {folderList.map((item) => (
          <li key={item.id} className="flex gap-x-2 gap-y-2">
            <img src="src/assets/folder-img.svg" alt="Reflection Icon" />
            <span className="text-[#FFFFFF] text-sm">{item.name}</span>
          </li>
        ))}
      </div>
    </div>
  );
};
