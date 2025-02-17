import { useEffect, useState } from "react";
import { notesRecent } from "../notesModels";
import { folderProps } from "./maincomponent";
import { AxiosApi } from "../ApiBaseUrl";

const FolderView = ({
  folder,
  onNoteSelect,
  selectedMoreOption,
  searchContent,
}: folderProps) => {
  const [notesView, setNotesView] = useState<notesRecent[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const limit = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [folder.id, selectedMoreOption]);

  useEffect(() => {
    const fetchNotesView = async () => {
      try {
        const response = await AxiosApi.get("/notes", {
          params: {
            archived: selectedMoreOption === "archived" ? true : false,
            favorite: selectedMoreOption === "favorites" ? true : false,
            deleted: selectedMoreOption === "trash" ? true : false,
            folderId: selectedMoreOption == "" ? folder.id : undefined,
            page: currentPage,
            limit: limit,
          },
        });
        setNotesView(response.data.notes);
        console.log(response.data.notes);
        setTotalPages(Math.max(Math.ceil(response.data.total / limit), 1));
      } catch (error) {
        console.log("error fetching notes", error);
      }
    };
    fetchNotesView();
  }, [folder.id, selectedMoreOption, currentPage]);

  const onClickHandler = async (id: string) => {
    try {
      const response = await AxiosApi.get(`/notes/${id}`);
      onNoteSelect(response.data.note);
    } catch (error) {
      console.log("error in fetching the notes", error);
    }
  };

  const title =
    selectedMoreOption === "archived"
      ? "Archived Notes"
      : selectedMoreOption === "trash"
      ? "Trash"
      : selectedMoreOption === "favorites"
      ? "Favorites"
      : folder.name;

  return (
    <div
      className="flex flex-col w-[20%] bg-[#1C1C1C;] pt-10 p-6 max-h-[1000px] overflow-y-scroll overflow-x-hidden  [&::-webkit-scrollbar]:w-1
  dark:[&::-webkit-scrollbar-track] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-y-8">
          <span className="text-white text-xl">{title}</span>
          {notesView.map((item) => {
            const formattedDate = new Date(item.createdAt).toLocaleDateString(
              "en-GB"
            );
            if (item.title.toLocaleLowerCase().includes(searchContent)) {
              return (
                <div
                  key={item.id}
                  onClick={() => onClickHandler(item.id)}
                  className="flex flex-col p-4 bg-[#FFFFFF08] cursor-pointer"
                >
                  <div className="flex flex-col gap-y-3">
                    <p className="text-xl text-white">{item.title}</p>
                    <div className="flex justify-around">
                      <p className="text-[#FFFFFF99] text-sm">
                        {formattedDate}
                      </p>
                      <p className="text-[#FFFFFF99] text-sm">
                        {item.preview.slice(0, 25) + "...."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default FolderView;
