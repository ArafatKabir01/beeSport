import getCapitalizeEachWord from "@/utils/get-capitalize-each-word";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import { Badge } from "rizzui";

export default function StreamingLink({ source }: { source: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: source.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <li
      ref={setNodeRef}
      style={style}
      key={source.id}
      className={`mb-3 flex items-center justify-between rounded-md border-2 border-primary p-2`}
    >
      <div>
        <p className='font-bold'>
          Stream Title: <span className='text-sm font-medium'>{source.stream_title}</span>
        </p>
        <p className='font-bold'>
          Link:{" "}
          {source.stream_type !== "root_stream" && (
            <span className='font-medium'>
              {source.stream_url.length > 50 ? source.stream_url.slice(0, 50) + "..." : source.stream_url}
            </span>
          )}
          {source.stream_type === "root_stream" &&
            source.root_streams.map((link: any, index: number) => {
              return (
                <span className='font-medium' key={index}>
                  {link.root_stream_stream_url.length > 50
                    ? link.root_stream_stream_url.slice(0, 50) + "..."
                    : link.root_stream_stream_url}
                </span>
              );
            })}
        </p>

        <p className='font-bold my-2 flex gap-2'>
          <Badge color='primary' size='sm'>
            {getCapitalizeEachWord(source.stream_type.replace("_", " "))}
          </Badge>
          {source?.stream_status == "1" ? (
            <Badge color='success' size='sm'>
              Active
            </Badge>
          ) : (
            <span className='badge bg-red-400'>Inactive</span>
          )}
        </p>
      </div>
      <div>
        <MdDragIndicator className='cursor-grab text-xl outline-none' {...attributes} {...listeners} />
      </div>
    </li>
  );
}
