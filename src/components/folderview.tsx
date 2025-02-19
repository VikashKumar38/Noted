import { useEffect, useState } from "react";
import { notesRecent } from "../notesModels";
import { AxiosApi } from "../ApiBaseUrl";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RotateLoader } from "react-spinners";

const FolderView = () => {
  const [notesView, setNotesView] = useState<notesRecent[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [debounceValue, setDebounceValue] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { folderId, folderName } = useParams();

  const queryParams = new URLSearchParams(location.search);
  const MoreOptionName = queryParams.get("folderName");
  console.log("More" + MoreOptionName);

  const limit = 10;
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebounceValue(searchQuery);
    }, 700);
    return () => clearTimeout(interval);
  }, [searchQuery]);

  useEffect(() => {
    const fetchNotesView = async () => {
      try {
        setLoading(true);
        const response = await AxiosApi.get("/notes", {
          params: {
            archived: MoreOptionName === "archived",
            favorite: MoreOptionName === "favorites",
            deleted: MoreOptionName === "trash",
            folderId: MoreOptionName == null ? folderId : undefined,
            page: currentPage,
            limit: limit,
            search: debounceValue,
          },
        });

        setNotesView(response.data.notes);
        setTotalPages(Math.max(Math.ceil(response.data.total / limit), 1));

        console.log(response.data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotesView();
  }, [folderId, currentPage, MoreOptionName, location.pathname, debounceValue]);

  const onClickHandler = async (
    id: string,
    folderid: string,
    foldername: string
  ) => {
    const searchParams = new URLSearchParams(location.search);
    navigate({
      pathname: !location.pathname.includes("more")
        ? `recents/${folderid}/${foldername}/${id}`
        : `more/extranotes/${id}`,
      search: searchParams.toString(),
    });
  };

  const title =
    MoreOptionName === "archived"
      ? "Archived Notes"
      : MoreOptionName === "trash"
      ? "Trash"
      : MoreOptionName === "favorites"
      ? "Favorites"
      : folderName;

  return (
    <div
      className="flex flex-col w-[20%] bg-[#1C1C1C;] pt-10 p-6 max-h-[1000px] overflow-y-scroll overflow-x-hidden  [&::-webkit-scrollbar]:w-1
  dark:[&::-webkit-scrollbar-track] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      {loading ? (
        <div className="flex items-center h-full justify-center">
          <RotateLoader color="gray" size={20} />
        </div>
      ) : (
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-y-8">
            <span className="text-white text-xl">{title}</span>
            {notesView.map((item) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString(
                "en-GB"
              );
              // if (item.title.toLocaleLowerCase().includes(searchContent)) {
              return (
                <div
                  key={item.id}
                  onClick={() =>
                    onClickHandler(item.id, item.folder.id, item.folder.name)
                  }
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
      )}
    </div>
  );
};
export default FolderView;
