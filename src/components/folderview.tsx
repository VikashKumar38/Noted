import { useEffect, useState } from "react";
import { notesRecent } from "../notesModels";
import axios from "axios";
import { folderProps } from "./maincomponent";

const FolderView = ({ folder, setNote }: folderProps) => {
  const [notesView, setNotesView] = useState<notesRecent[]>([]);

  useEffect(() => {
    const fetchNotesView = async () => {
      try {
        const response = await axios.get("api/notes", {
          params: {
            archived: false,
            favorite: false,
            deleted: false,
            folderId: folder.id,
            page: 1,
            limit: 10,
          },
        });
        setNotesView(response.data.notes);
        console.log(response.data.notes);
      } catch (error) {
        console.log("error fetching notes", error);
      }
    };
    fetchNotesView();
  }, [folder.id]);

  const onClickHandler = async (id: string) => {
    try {
      const response = await axios.get(`/api/notes/${id}`);
      setNote(response.data.note);
    } catch (error) {
      console.log("error in fetching the notes", error);
    }
  };
  return (
    <div className="flex flex-col w-[20%] bg-[#1C1C1C;] pt-10 p-6 ">
      <div className="flex flex-col gap-y-8">
        <span className="text-white text-xl">{folder.name}</span>
        {notesView.map((item) => {
          const formattedDate = new Date(item.createdAt).toLocaleDateString(
            "en-GB"
          );
          return (
            <div
              key={item.id}
              onClick={() => onClickHandler(item.id)}
              className="flex flex-col p-4 bg-[#FFFFFF08] cursor-pointer"
            >
              <div className="flex flex-col gap-y-3">
                <p className="text-xl text-white">{item.title}</p>
                <div className="flex justify-around">
                  <p className="text-[#FFFFFF99] text-sm">{formattedDate}</p>
                  <p className="text-[#FFFFFF99] text-sm">
                    {item.preview.slice(0, 25) + "...."}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FolderView;
