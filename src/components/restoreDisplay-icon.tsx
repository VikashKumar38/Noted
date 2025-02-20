import { useState } from "react";
import { AxiosApi } from "../ApiBaseUrl";
import { Note } from "./maincomponent";
import { RotateLoader } from "react-spinners";

type RestoreProps = {
  note: Note;
  setCurrentNote: (note: Note) => void;
};

export const Restore = ({ note, setCurrentNote }: RestoreProps) => {
  const [loading, setLoading] = useState(false);

  const onClickRestore = async () => {
    try {
      setLoading(true);
      const response = await AxiosApi.post<string>(`/notes/${note.id}/restore`);
      console.log(response.data);
      const currentNote = await AxiosApi.get<{
        note: Note;
      }>(`/notes/${note.id}`);
      setCurrentNote(currentNote.data.note);
      console.log(currentNote);
    } catch (error) {
      console.log("error in restoring", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-8 w-[50%]">
        {loading ? (
          <div className="flex items-center h-full justify-center">
            <RotateLoader color="gray" size={20} />
          </div>
        ) : (
          <>
            <img src="/src/assets/restore-icon.svg" alt="restore-icon" />
            <span className="text-[#FFFFFF] text-2xl">{note!.title} </span>
            <p className="text-[#FFFFFF]">
              Don't want to lose this note? It's not too late! Just click the
              'Restore' button and it will be added back to your list. It's that
              simple.
            </p>
            <button
              onClick={onClickRestore}
              className="bg-[#312EB5] rounded-md pt-3 pb-3 pl-7 pr-7 cursor-pointer"
            >
              Restore
            </button>
          </>
        )}
      </div>
    </div>
  );
};
