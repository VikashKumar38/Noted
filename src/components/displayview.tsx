import { InitialDisplayView } from "../initialDisplayview";
import { Note } from "./maincomponent";
import { ContentView } from "../ContentDisplayView";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosApi } from "../ApiBaseUrl";
import { RotateLoader } from "react-spinners";

export type DisplayviewProps = {
  note?: Note | null;
  isNewNoteClicked: boolean;
  setNewNoteClicked: (isclicked: boolean) => void;
  currentfolderid: string;
};

const Displayview = ({
  isNewNoteClicked,
  setNewNoteClicked,
  currentfolderid,
}: DisplayviewProps) => {
  const [loading, setLoading] = useState(false);

  const [note, setNote] = useState<Note>();

  const { noteID } = useParams();


  const path = useLocation();

  useEffect(() => {
    const FetchNote = async () => {
      try {
        if (
          (path.pathname.includes("recents") ||
            path.pathname.includes("more")) &&
          noteID
        ) {
          setLoading(true);
          const response = await AxiosApi.get<{
            note: Note;
          }>(`/notes/${noteID}`);
          setNote(response.data.note);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };
    FetchNote();
  }, [noteID, path.pathname]);

  return (
    <div className="w-[60%] h-[100vh] bg-[#181818]">
      {loading && (
        <div className="flex items-center h-full justify-center">
          <RotateLoader color="gray" size={20} />
        </div>
      )}
      <div>
        {isNewNoteClicked ? (
          <ContentView
            note={null}
            isNewNoteClicked={true}
            setNewNoteClicked={setNewNoteClicked}
            currentfolderid={currentfolderid}
          />
        ) : note ? (
          <ContentView
            note={note}
            isNewNoteClicked={false}
            setNewNoteClicked={setNewNoteClicked}
            currentfolderid={currentfolderid}
          />
        ) : (
          <InitialDisplayView />
        )}
      </div>
    </div>
  );
};

export default Displayview;
