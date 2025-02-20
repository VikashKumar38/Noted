import { useEffect, useState } from "react";
import { notesRecent } from "../notesModels";
import { AxiosApi } from "../ApiBaseUrl";
import { Note } from "./maincomponent";
import { useNavigate } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { toast } from "react-toastify";

export type recentProps = {
  setSelectedNoteID: (id: string | null) => void;
  handleNoteSelection: (note: Note | undefined) => void;
};

export const Recents = () => {
  const [recents, setRecents] = useState<notesRecent[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecents = async () => {
      try {
        const response = await AxiosApi.get<{
          recentNotes: notesRecent[];
        }>("/notes/recent");
        setRecents(response.data.recentNotes);
      } catch (error) {
        console.log(error);
        toast.error("failded to fetch recent notes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecents();
  }, []);

  const handleRecentClick = (
    noteid: string,
    folderId: string,
    folderName: string
  ) => {
    navigate(`recents/${folderId}/${folderName}/${noteid}`);
  };

  return (
    <div className="pl-2.5 flex flex-col gap-y-3">
      <h5 className="text-sm text-[#FFFFFF99]">Recents</h5>
      {loading && (
        <div className="flex items-center h-full justify-center">
          <RotateLoader color="gray" size={20} />
        </div>
      )}
      <div className="flex gap-2 flex-col">
        {recents.map((item) => (
          <li
            onClick={() =>
              handleRecentClick(item.id, item.folder.id, item.folder.name)
            }
            key={item.id}
            className="flex gap-x-3 gap-y-3"
          >
            <img
              src="/src/assets/nonSelected-recent.svg"
              alt="Reflection Icon"
              className="w-6 h-6 cursor-pointer"
            />
            <span className="text-[#FFFFFF] text-sm cursor-pointer">
              {item.title}
            </span>
          </li>
        ))}
      </div>
    </div>
  );
};
