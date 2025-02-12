import axios from "axios";
import { useEffect, useState } from "react";
import { notes } from "../notesModels";

type recentNotes = {
  recentNotes: [];
};

export const Recents = () => {
  const [recents, setRecents] = useState<notes[]>([]);
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
    <div className="pl-2.5">
      <h5 className="text-xs text-[#FFFFFF99]">Recents</h5>
      {loading && <p className="text-gray-400">Loading...</p>}
      <div className="flex gap-2">
        {recents.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <img
              src="/assets/Reflection.svg"
              alt="Reflection Icon"
              className="w-6 h-6"
            />
            <span>{item.title}</span>
          </li>
        ))}
      </div>
    </div>
  );
};
