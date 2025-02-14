import { InitialDisplayView } from "../initialDisplayview";
import { Note } from "./maincomponent";
import { Restore } from "./restoreDisplay-icon";
import { ContentView } from "../ContentDisplayView";

export type DisplayviewProps = {
  note?: Note;
};

const Displayview = ({ note }: DisplayviewProps) => {
  return (
    <div className=" w-[60%] h-dvh bg-[#181818]">
      <div>
        {note ? (
          note.isArchived ? (
            <Restore />
          ) : (
            <ContentView note={note} />
          )
        ) : (
          <InitialDisplayView />
        )}
      </div>
    </div>
  );
};
export default Displayview;
