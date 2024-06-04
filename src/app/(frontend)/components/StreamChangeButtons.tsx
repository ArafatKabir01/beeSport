import { IoDiamondOutline } from "react-icons/io5";

export default function StreamChangeButtons({
  watchTime,
  streamingSources,
  currentStreamIndex,
  handleStreamButtonClick
}: any) {
  return (
    <div className='flex flex-col items-start justify-between mt-5 px-1 lg:px-4'>
      <div className='flex flex-wrap gap-1 lg:gap-4'>
        {streamingSources?.map((stream: any, index: number) => (
          <button
            key={index}
            className={`btn btn-xs lg:btn-sm rounded-full
    ${
      currentStreamIndex === index
        ? `btn-error shadow-lg shadow-rose-300`
        : `btn-outline ${stream?.is_premium == 1 ? "btn-error shadow-md shadow-rose-300" : "btn-primary"}   `
    }`}
            onClick={() => handleStreamButtonClick(index, watchTime)}
          >
            {stream?.is_premium == 1 && (
              <span>
                <IoDiamondOutline />
              </span>
            )}
            <span>{stream?.stream_title} </span>
          </button>
        ))}
      </div>
    </div>
  );
}
