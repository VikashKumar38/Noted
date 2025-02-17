
type moreProps = {
  setSelectedMoreOption: (name: string) => void;
};

export const More = ({ setSelectedMoreOption }: moreProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      <h5 className="pl-2.5 text-sm text-[#FFFFFF99] cursor-pointer">More</h5>
      <div className="flex flex-col gap-y-3">
        <div
          onClick={() => setSelectedMoreOption("favorites")}
          className="flex gap-x-3 pl-2.5 cursor-pointer "
        >
          <img src="./src/assets/star-icon.svg" alt="star-icon" />
          <span className="text-[#FFFFFF99] cursor-pointer">Favorites</span>
        </div>
        <div
          onClick={() => setSelectedMoreOption("trash")}
          className="flex gap-x-3 pl-3 cursor-pointer"
        >
          <img
            className="cursor-pointer "
            src="./src/assets/trash-icon.svg"
            alt="trash-icon"
          />
          <span className="text-[#FFFFFF99] cursor-pointer">Trash</span>
        </div>
        <div
          onClick={() => setSelectedMoreOption("archived")}
          className="flex gap-x-3 pl-2.5 cursor-pointer"
        >
          <img
            className="cursor-pointer "
            src="./src/assets/archived-icon.svg"
            alt="Archived-icon"
          />
          <span className="text-[#FFFFFF99]">Archived Notes</span>
        </div>
      </div>
    </div>
  );
};
