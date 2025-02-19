export const InitialDisplayView = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full h-[100vh]">
      <div className="flex flex-col justify-center items-center gap-y-3 max-w-md text-center">
        <img
          src="/src/assets/initial-display-icon.svg"
          alt="initial image"
          className="w-16 h-16"
        />
        <span className="text-white text-lg">Select a note to view</span>
        <p className="text-white">
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </div>
    </div>
  );
};
