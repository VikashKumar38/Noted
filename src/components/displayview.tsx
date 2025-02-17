import { InitialDisplayView } from "../initialDisplayview";
import { Note } from "./maincomponent";
import { ContentView } from "../ContentDisplayView";

export type DisplayviewProps = {
  note?: Note | null;
  isNewNoteClicked: boolean;
  setNewNoteClicked: (isclicked: boolean) => void;
  currentfolderid: string;
};

const Displayview = ({
  note,
  isNewNoteClicked,
  setNewNoteClicked,
  currentfolderid,
}: DisplayviewProps) => {
  return (
    <div className="w-[60%] h-dvh bg-[#181818]">
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
