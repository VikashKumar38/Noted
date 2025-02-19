import { DisplayviewProps } from "./components/displayview";
import { useEffect, useState } from "react";
import { Restore } from "./components/restoreDisplay-icon";
import { Note } from "./components/maincomponent";
import { AxiosApi } from "./ApiBaseUrl";
import { RotateLoader } from "react-spinners";
// import { useParams } from "react-router-dom";

type Position = {
  positionX: number;
  positionY: number;
};

export const ContentView = ({
  note,
  isNewNoteClicked,
  setNewNoteClicked,
  currentfolderid,
}: DisplayviewProps) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(note ?? null);
  const [newNoteContent, setNewNoteContent] = useState<string>("");
  const [newNoteTitle, setNewNoteTitle] = useState<string>("");

  useEffect(() => {
    if (note) {
      setCurrentNote(note);
    }
  }, [note]);

  // const { folderId, folderName } = useParams();
  // console.log("printing folder id in contentview", folderId, folderName);

  const onClickSaveNote = async () => {
    try {
      const response = await AxiosApi.post("/notes", {
        folderId: currentfolderid,
        title: newNoteTitle,
        content: newNoteContent,
        isFavorite: false,
        isArchived: false,
      });
      const latestNotesResponse = await AxiosApi.get("/notes", {
        params: { folderId: currentfolderid },
      });

      const savedNote = latestNotesResponse.data?.notes;
      console.log("newly created :- " + savedNote);

      if (savedNote) {
        setCurrentNote(savedNote);
      }
      setNewNoteClicked(false);
      console.log("Note saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };
  const onClickBack = () => {
    setNewNoteClicked(false);
  };

  const formattedDate: string = currentNote
    ? new Date(currentNote.createdAt).toLocaleDateString("en-GB")
    : "";

  const onDeleteHandler = async () => {
    if (!currentNote || currentNote.isArchived) return;

    setLoading(true);

    try {
      await AxiosApi.delete(`notes/${note?.id}`);
      setCurrentNote((prev) =>
        prev
          ? {
              ...prev,
              deletedAt: new Date().toLocaleDateString("en-GB"),
            }
          : null
      );
    } catch (error) {
      console.log("Error deleting note:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickArchive = async () => {
    try {
      const response = await AxiosApi.patch(`/notes/${note?.id}`, {
        isArchived: true,
      });
      console.log(response);
    } catch (error) {
      console.log("Error in adding to archive", error);
    }
  };

  const AddToFav = async () => {
    if (!note || !note.id) {
      console.log("No note selected to add to favorites");
      return;
    }

    try {
      const response = await AxiosApi.patch(`/notes/${note.id}`, {
        folderId: currentfolderid,
        title: note.title,
        content: note.content,
        isFavorite: true,
        isArchived: false,
      });

      console.log("Added to favorites:", response.data);
      setCurrentNote((prev) => (prev ? { ...prev, isFavorite: true } : null)); // Update UI
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  if (isNewNoteClicked) {
    return (
      <div className="flex flex-col w-full p-6 text-white">
        {loading && (
          <div className="flex items-center h-full justify-center">
            <RotateLoader color="gray" size={20} />
          </div>
        )}
        <input
          type="text"
          className="text-xl bg-transparent border-b border-gray-500 outline-none w-full"
          placeholder="Untitled Note"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />
        <textarea
          className="w-full h-auto bg-transparent outline-none mt-4 text-lg "
          placeholder="Start typing..."
          rows={30}
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
        ></textarea>
        <div className="flex justify-center items-center gap-x-5">
          <button
            onClick={onClickSaveNote}
            className=" bg-blue-600 p-2 rounded-md cursor-pointer"
          >
            Save
          </button>
          <button
            className=" bg-blue-600 p-2 rounded-md cursor-pointer"
            onClick={onClickBack}
          >
            back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-6 pl-10 pt-12 pr-12">
        {loading ? (
          <div className="flex items-center h-full justify-center">
            <RotateLoader color="gray" size={20} />
          </div>
        ) : !currentNote?.deletedAt ? (
          <>
            <div className="flex text-4xl text-white justify-between items-center">
              <div>{currentNote!.title}</div>
              <img
                onClick={(e) =>
                  setPosition({ positionX: e.pageX, positionY: e.pageY })
                }
                className="cursor-pointer"
                src="/src/assets/option-icon.svg"
                alt="content option"
              />
            </div>

            <div className="flex gap-x-12">
              <div className="flex gap-x-4 items-center">
                <img src="/src/assets/Date-icon.svg" alt="Date" />
                <span className="text-sm text-[#FFFFFF99]">Date</span>
              </div>
              <span className="text-sm underline text-[#FFFFFF]">
                {formattedDate}
              </span>
            </div>

            <div className="h-[0.1px] w-full bg-gray-600"></div>

            <div className="flex gap-x-9">
              <div className="flex justify-around gap-x-4">
                <img src="/src/assets/folder-icon.svg" alt="folder" />
                <span className="text-sm text-[#FFFFFF99]">Folder</span>
              </div>
              <span className="text-sm underline text-[#FFFFFF]">
                {currentNote?.folder?.name || "No folder"}
              </span>
            </div>

            <div
              className="text-[#FFFFFF] text-md max-h-[900px] overflow-y-scroll overflow-x-hidden  [&::-webkit-scrollbar]:w-2
  dark:[&::-webkit-scrollbar-track]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-500"
            >
              {currentNote!.content}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <Restore note={currentNote} setCurrentNote={setCurrentNote} />
          </div>
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
            <li
              onClick={AddToFav}
              className="flex gap-x-1 cursor-pointer hover:bg-gray-600 pt-1 pb-1 rounded-sm"
            >
              <img src="/src/assets/fav-icon.svg" alt="fav" />
              <span className="text-sm">
                {currentNote?.isFavorite ? "Remove Favorite" : "Add Favorite"}
              </span>
            </li>
            <li
              onClick={onClickArchive}
              className="flex gap-x-1 cursor-pointer hover:bg-gray-600 pt-1 pb-1 rounded-sm"
            >
              <img src="/src/assets/content-archive.svg" alt="archive" />
              <span className="text-sm">
                {currentNote?.isArchived ? "Unarchive" : "Archive"}
              </span>
            </li>
            <li className="flex gap-x-1">
              <div className="h-[0.1px] w-full bg-gray-600"></div>
            </li>
            <li
              onClick={onDeleteHandler}
              className="flex gap-x-1 cursor-pointer hover:bg-red-500 rounded-sm pt-1 pb-1"
            >
              <img src="/src/assets/delete-icon.svg" alt="del" />
              <span className="text-sm">Delete</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
