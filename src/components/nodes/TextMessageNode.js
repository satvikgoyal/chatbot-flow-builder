import { BiMessageRoundedDetail } from "react-icons/bi";
import {IoLogoWhatsapp} from 'react-icons/io';
import CustomisedHandle from '../handlers/CustomisedHandle';
import {Position} from 'reactflow';

/**
 * this component gets the value to render from {data.value} props
 *
 * similarly if there is a Image node
 * we can get the url from the same data.value props
 * and could be rendered using img tag
 */
export default function TextMessageNode({data, ...props}) {
  return (
    <button className="rounded-lg focus:ring-1 focus:ring-offset-8 hover:shadow-2xl bg-white ring-offset-white focus:m-10 focus:bg-teal-50 hover:bg-gray-100 group focus:ring-teal-500 transform transition-all duration-500 ease-in-out">
    <div className="flex-col w-full group transition-all duration-500 ease-in-out border min-w-72 rounded-lg hover:border-black group-focus:border-teal-100">
      <div className="flex justify-between p-2 border-b bg-teal-100 rounded-t-md border-b border-teal-300">
        <div className="flex flex-row gap-2 items-center">
          <BiMessageRoundedDetail size={16} />
           <p className="text-xs">Send Message</p>
        </div>

        <div className="p-1 bg-white rounded-full border">
          <IoLogoWhatsapp size={12} className="text-[#25D366]" />
        </div>
      </div>

      <div className="p-2 py-4">
        {data?.value ? (
          <h1
            className="text-sm text-center whitespace-pre-line"
            onClick={() => data?.onClick()}>
            {data?.value}
          </h1>
        ) : (
          <p className="text-sm text-center text-gray-400">
            Click to edit
          </p>
        )}
      </div>

      {/* we can create */}
      <CustomisedHandle type="target" position={Position.Left} />
      <CustomisedHandle type="source" position={Position.Right} />
    </div>
  </button>

  );
}
