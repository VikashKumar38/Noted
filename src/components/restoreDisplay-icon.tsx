import { Note } from "./maincomponent";

type RestoreProps = {
  note: Note;
};

export const Restore = ({ note }: RestoreProps) => {
  return (
    <div className="w-full flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-8 w-[50%]">
        <img src="./src/assets/restore-icon.svg" alt="restore-icon" />
        <span className="text-[#FFFFFF] text-2xl">{note!.title} </span>
        <p className="text-[#FFFFFF]">
          Don't want to lose this note? It's not too late! Just click the
          'Restore' button and it will be added back to your list. It's that
          simple.
        </p>
        <button className="bg-[#312EB5] rounded-md pt-3 pb-3 pl-7 pr-7 cursor-pointer">
          Restore
        </button>
      </div>
    </div>
  );
};
