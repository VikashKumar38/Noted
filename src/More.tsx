import { useNavigate } from "react-router-dom";

// type moreProps = {
//   setSelectedMoreOption: (name: string) => void;
// };

export const More = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2.5">
      <h5 className="pl-2.5 text-sm text-[#FFFFFF99] cursor-pointer">More</h5>
      <div className="flex flex-col gap-y-3 ">
        <div
          onClick={() => {
            // setSelectedMoreOption("favorites");
            navigate(`more?folderName=favorites`);
          }}
          className="flex gap-x-3 pl-2.5 cursor-pointer hover:shadow-lg hover:shadow-white"
        >
          <img src="/src/assets/star-icon.svg" alt="star-icon" />
          <span className="text-[#FFFFFF99] cursor-pointer">Favorites</span>
        </div>
        <div
          onClick={() => {
            // setSelectedMoreOption("trash");
            navigate(`more?folderName=trash`);
          }}
          className="flex gap-x-3 pl-3 cursor-pointer hover:shadow-lg hover:shadow-white"
        >
          <img
            className="cursor-pointer "
            src="/src/assets/trash-icon.svg"
            alt="trash-icon"
          />
          <span className="text-[#FFFFFF99] cursor-pointer">Trash</span>
        </div>
        <div
          onClick={() => {
            // setSelectedMoreOption("archived");
            navigate(`more?folderName=archived`);
          }}
          className="flex gap-x-3 pl-2.5 cursor-pointer hover:shadow-lg hover:shadow-white"
        >
          <img
            className="cursor-pointer "
            src="/src/assets/archived-icon.svg"
            alt="Archived-icon"
          />
          <span className="text-[#FFFFFF99]">Archived Notes</span>
        </div>
      </div>
    </div>
  );
};
