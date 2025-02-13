import { InitialDisplayView } from "../initialDisplayview";
import { Note } from "./maincomponent";
import { Restore } from "./restoreDisplay-icon";

type DisplayviewProps = {
  note: Note;
};

const Displayview = ({ note }: DisplayviewProps) => {
  return (
    <div className="flex flex-col w-[60%] items-center justify-center h-dvh bg-[#181818]">
      <div>
        {!note ? (
          <InitialDisplayView />
        ) : note.isArchived ? (
          <Restore />
        ) : (
          <h1 className="text-white">{note.content
            }</h1>
        )}
      </div>
    </div>
  );
};
export default Displayview;
