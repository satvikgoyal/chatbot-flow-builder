import {IoIosArrowRoundBack} from 'react-icons/io';


export default function TextNodeEditor({selectedMessage, updateSelectedMessage, onMessageDeselection}) {
  return (
    <div className="">
      <div className="mb-5 flex justify-between border-b p-4 py-2">
        <IoIosArrowRoundBack size={28} className="cursor-pointer" onClick={onMessageDeselection} />

        <h1 className="text-base font-medium">Message</h1>
        <div />
      </div>

      <div className="px-4">
        <h1 className="text-sm mb-3 text-gray-500">Text</h1>

        <textarea
          className="w-full p-2 mb-3 bg-white border-2 border-teal-500 rounded-lg font-medium"
          placeholder="Type your message here..."
          value={selectedMessage?.data?.value}
          onChange={event => updateSelectedMessage(event.target.value)}
        />
        <hr />
      </div>
    </div>
  );
}
