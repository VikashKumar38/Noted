import { useEffect, useState } from "react";
import { notesRecent } from "../notesModels";
import { AxiosApi } from "../ApiBaseUrl";
import { Note } from "./maincomponent";

export type recentProps = {
  setSelectedNoteID: (id: string | null) => void;
  handleNoteSelection: (note: Note | undefined) => void;
};

export const Recents = ({
  setSelectedNoteID,
  handleNoteSelection,
}: recentProps) => {
  const [recents, setRecents] = useState<notesRecent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecents = async () => {
      try {
        const response = await AxiosApi.get("/notes/recent");
        setRecents(response.data.recentNotes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecents();
  }, []);

  const handleRecentClick = async (id: string) => {
    setSelectedNoteID(id); // Update selected note ID

    try {
      const response = await AxiosApi.get(`/notes/${id}`);
      const note = response.data.note;

      handleNoteSelection(note); // Pass the full note data to MainComponent
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  return (
    <div className="pl-2.5 flex flex-col gap-y-3">
      <h5 className="text-sm text-[#FFFFFF99]">Recents</h5>
      {loading && <p className="text-gray-400">Loading...</p>}
      <div className="flex gap-2 flex-col">
        {recents.map((item) => (
          <li
            onClick={() => handleRecentClick(item.id)}
            key={item.id}
            className="flex gap-x-3 gap-y-3"
          >
            <img
              src="src/assets/nonSelected-recent.svg"
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
