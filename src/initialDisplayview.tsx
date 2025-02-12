export const InitialDisplayView = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-3">
      <div className="flex flex-col justify-center items-center gap-y-3 w-[50%]">
        <img src="./src/assets/initial-display-icon.svg" alt="intialimage" />
        <span className="text-[#FFFFFF]">Select a note to view</span>
        <p className="text-[#FFFFFF] text-center">
          choose a note from the list on the left to view its contents, or
          create a new note to add to your collection
        </p>
      </div>
    </div>
  );
};
