import axios from "axios";
import { useEffect, useState } from "react";
import { notesRecent } from "../notesModels";

type recentNotes = {
  recentNotes: notesRecent[];
};

export const Recents = () => {
  const [recents, setRecents] = useState<notesRecent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecents = async () => {
      try {
        const response = await axios.get<recentNotes>("api/notes/recent");
        setRecents(response.data.recentNotes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecents();
  }, []);
  return (
    <div className="pl-2.5 flex flex-col gap-y-3">
      <h5 className="text-sm text-[#FFFFFF99]">Recents</h5>
      {loading && <p className="text-gray-400">Loading...</p>}
      <div className="flex gap-2 flex-col">
        {recents.map((item) => (
          <li key={item.id} className="flex gap-x-3 gap-y-3">
            <img
              src="src/assets/nonSelected-recent.svg"
              alt="Reflection Icon"
              className="w-6 h-6"
            />
            <span className="text-[#FFFFFF] text-sm">{item.title}</span>
          </li>
        ))}
      </div>
    </div>
  );
};
