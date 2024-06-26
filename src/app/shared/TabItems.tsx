import { ITabItems } from "@/types";

export default function TabItem({ tab, onClick, active, isWhite }: ITabItems) {
  const classNames = `hover:  transition-all ease-in duration-150 cursor-pointer text-[11px] md:text-base font-regular ${
    active
      ? "  font-medium after:content-['_-'] after:absolute relative after:top-4 after:  after:left-[45%]"
      : isWhite
      ? "text-black"
      : "text-gray-400"
  }`;

  return (
    <div onClick={onClick} className={classNames}>
      {tab}
    </div>
  );
}
