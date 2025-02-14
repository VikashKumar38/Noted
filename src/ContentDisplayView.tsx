import axios from "axios";
import { DisplayviewProps } from "./components/displayview";
import { useEffect, useState } from "react";
import { Restore } from "./components/restoreDisplay-icon";
import { Note } from "./components/maincomponent";

type Position = {
  positionX: number;
  positionY: number;
};

export const ContentView = ({ note }: DisplayviewProps) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(note ?? null);

  useEffect(() => {
    if (note) {
      setCurrentNote(note);
    }
  }, [note]);

  const formattedDate: string = currentNote
    ? new Date(currentNote.createdAt).toLocaleDateString("en-GB")
    : "";

  const onDeleteHandler = async () => {
    if (!currentNote) return;

    try {
      await axios.delete(`/api/notes/${currentNote.id}`);
    } catch (error) {
      console.log("Error deleting note:", error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-6 pl-10 pt-12 pr-12">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : currentNote ? (
          <>
            <div className="flex text-4xl text-white justify-between items-center">
              <div>{currentNote.title}</div>
              <img
                onClick={(e) =>
                  setPosition({ positionX: e.pageX, positionY: e.pageY })
                }
                className="cursor-pointer"
                src="./src/assets/option-icon.svg"
                alt="content option"
              />
            </div>

            <div className="flex gap-x-12">
              <div className="flex gap-x-4 items-center">
                <img src="./src/assets/Date-icon.svg" alt="Date" />
                <span className="text-sm text-[#FFFFFF99]">Date</span>
              </div>
              <span className="text-sm underline text-[#FFFFFF]">
                {formattedDate}
              </span>
            </div>

            <div className="h-[0.1px] w-full bg-gray-600"></div>

            <div className="flex gap-x-9">
              <div className="flex justify-around gap-x-4">
                <img src="./src/assets/folder-icon.svg" alt="folder" />
                <span className="text-sm text-[#FFFFFF99]">Folder</span>
              </div>
              <span className="text-sm underline text-[#FFFFFF]">
                {currentNote.folder?.name || "No folder"}
              </span>
            </div>

            <div className="text-[#FFFFFF] text-md">
              {!currentNote.isArchived ? currentNote.content : <Restore />}
            </div>
          </>
        ) : (
          <p className="text-white">No note selected</p>
        )}
      </div>

      {position && (
        <div
          onMouseLeave={() => setPosition(null)}
          className="absolute bg-[#333333] text-white p-2 rounded-md shadow-lg flex justify-between w-fit"
          style={{
            top: position.positionY + 30,
            left: position.positionX - 120,
          }}
        >
          <ul className="flex flex-col gap-y-4">
            <li className="flex gap-x-1 cursor-pointer hover:bg-gray-600 pt-1 pb-1 rounded-sm">
              <img src="./src/assets/fav-icon.svg" alt="fav" />
              <span className="text-sm">Add to favorites</span>
            </li>
            <li className="flex gap-x-1 cursor-pointer hover:bg-gray-600 pt-1 pb-1 rounded-sm">
              <img src="./src/assets/content-archive.svg" alt="archive" />
              <span className="text-sm">Archived</span>
            </li>
            <li className="flex gap-x-1">
              <div className="h-[0.1px] w-full bg-gray-600"></div>
            </li>
            <li
              onClick={onDeleteHandler}
              className="flex gap-x-1 cursor-pointer hover:bg-red-500 rounded-sm pt-1 pb-1"
            >
              <img src="./src/assets/delete-icon.svg" alt="del" />
              <span className="text-sm">Delete</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
