import { DisplayviewProps } from "./components/displayview";
import { useEffect, useState } from "react";
import { Restore } from "./components/restoreDisplay-icon";
import { Note } from "./components/maincomponent";
import { AxiosApi } from "./ApiBaseUrl";
import { RotateLoader } from "react-spinners";
import { toast } from "react-toastify";

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
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  useEffect(() => {
    if (note) {
      setCurrentNote(note);
    }
  }, [note]);

  const onClickSaveNote = async () => {
    try {
      const response = await AxiosApi.post("/notes", {
        folderId: currentfolderid,
        title: newNoteTitle,
        content: newNoteContent,
        isFavorite: false,
        isArchived: false,
      });
      // const latestNotesResponse = await AxiosApi.get("/notes", {
      //   params: { folderId: currentfolderid, search: "" },
      // });

      // const savedNote = latestNotesResponse.data?.notes[0];
      // console.log("newly created :- " + savedNote);

      // if (savedNote) {
      //   setCurrentNote(savedNote);
      // }
      if (response.data) {
        toast.success("saved Successfully please refresh the page to see");
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

  const onClickEditTitle = () => {
    setIsEditingTitle(true);
    setNewNoteTitle(currentNote!.title);
  };

  const SaveEditedTitle = async () => {
    try {
      const response = await AxiosApi.patch(`notes/${currentNote!.id}`, {
        folderId: currentNote?.folderId,
        title: newNoteTitle,
        content: currentNote?.content,
        isFavorite: false,
        isArchived: false,
      });
      if (response.data) {
        toast.success("saved ");
        setIsEditingTitle(false);
        const updatedNoteResponse = await AxiosApi.get(
          `/notes/${currentNote!.id}`
        );
        if (updatedNoteResponse.data.note) {
          setCurrentNote(updatedNoteResponse.data.note);
        }
      }
    } catch (error) {
      console.log("error in saving title", error);
      toast.error("failed to save");
    }
  };
  const SaveOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") SaveEditedTitle();
  };

  const SaveContentOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      saveEditedContent();
    }
  };

  const saveEditedContent = async () => {
    try {
      const response = await AxiosApi.patch(`notes/${currentNote!.id}`, {
        folderId: currentNote?.folderId,
        title: currentNote?.title,
        content: newNoteContent,
        isFavorite: false,
        isArchived: false,
      });
      if (response.data) {
        toast.success("saved ");
        setIsEditingContent(false);
        const updatedNoteResponse = await AxiosApi.get(
          `/notes/${currentNote!.id}`
        );
        if (updatedNoteResponse.data.note) {
          setCurrentNote(updatedNoteResponse.data.note);
        }
      }
    } catch (error) {
      console.log("error in saving title", error);
      toast.error("failed to save");
    }
  };
  const onClickEditContent = () => {
    setIsEditingContent(true);
    setNewNoteContent(currentNote!.content);
  };

  const onClickArchive = async () => {
    if (!currentNote || !currentNote.id) {
      console.log("No note selected to archive");
      return;
    }
    if (currentNote.isFavorite) {
      toast.info("it can be archived as this is marked as fav");
      return;
    }
    setLoading(true);

    try {
      const response = await AxiosApi.patch(`/notes/${currentNote.id}`, {
        isArchived: !currentNote.isArchived,
      });

      console.log("Updated Archive Status:", response.data);

      // Fetch latest note data after update
      const updatedNoteResponse = await AxiosApi.get(
        `/notes/${currentNote.id}`
      );

      setCurrentNote(updatedNoteResponse.data.note);
    } catch (error) {
      console.error("Error in adding to archive:", error);
    } finally {
      setLoading(false);
    }
  };

  const AddToFav = async () => {
    if (!currentNote || !currentNote.id) {
      console.log("No note selected to add to favorites");
      return;
    }
    if (currentNote.isArchived) {
      toast.info("this can not be marked as fav as it is already archived");
      return;
    }
    setLoading(true);
    try {
      const response = await AxiosApi.patch(`/notes/${currentNote.id}`, {
        isFavorite: !currentNote?.isFavorite,
      });
      console.log(response);

      const updatedNoteResponse = await AxiosApi.get(
        `/notes/${currentNote.id}`
      );

      setCurrentNote(updatedNoteResponse.data.note);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    } finally {
      setLoading(false);
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
          rows={26}
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
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-y-6 pl-10 pt-12 pr-12 h-full">
        {loading ? (
          <div className="flex items-center h-full justify-center">
            <RotateLoader color="gray" size={20} />
          </div>
        ) : !currentNote?.deletedAt ? (
          <>
            <div className="flex text-4xl text-white justify-between items-center">
              {isEditingTitle ? (
                <div>
                  <input
                    type="text"
                    className="text-xl bg-transparent border-b border-gray-500 outline-none w-full"
                    placeholder="Untitled Note"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    onKeyDown={SaveOnKeyDown}
                  />
                </div>
              ) : (
                <div onDoubleClick={onClickEditTitle}>{currentNote!.title}</div>
              )}
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
              <span className="text-sm underline text-[#FFFFFF] cursor-pointer">
                {currentNote?.folder?.name || "No folder"}
              </span>
            </div>

            <div
              onDoubleClick={onClickEditContent}
              className="h-full text-[#FFFFFF] text-md max-h-[900px] overflow-y-scroll overflow-x-hidden  [&::-webkit-scrollbar]:w-2
  dark:[&::-webkit-scrollbar-track]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-500"
            >
              {isEditingContent ? (
                <>
                  <textarea
                    className="w-full h-auto bg-transparent outline-none mt-4 text-lg grow"
                    rows={26}
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    onKeyDown={SaveContentOnKeyDown}
                  ></textarea>
                </>
              ) : (
                <div
                  className="h-full
                 grow"
                >
                  {currentNote!.content}
                </div>
              )}
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
