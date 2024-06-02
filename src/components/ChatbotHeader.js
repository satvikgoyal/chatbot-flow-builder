import {AiOutlineSave} from 'react-icons/ai';
import {SiTicktick} from 'react-icons/si';
import { RxReset } from "react-icons/rx";
import { IoTrashBinOutline } from "react-icons/io5"

export default function ChatbotHeader({handleSaveClick, showSaveIcon, handleResetClick, showResetIcon, nodes, showTrashIcon, handleClearWorkflow}) {
  return (
    <header className="flex flex-row justify-between items-center px-20 py-2 bg-[#f3f3f3] border-b">
      <h1 className="text-xl font-medium">Chatbot</h1>

      <div className="buttons-container flex flex-row justify-between gap-2">
        <button
          className="flex items-center px-2 py-1 text-sm text-teal-500 border-2 border-teal-500 rounded-lg font-medium transition-all hover:bg-teal-500/10 active:scale-95 active:bg-teal-500/30 disabled:opacity-50 disabled:pointer-events-none"
          onClick={handleSaveClick}
          disabled={!nodes?.length}
        >
          Save Workflow
          {showSaveIcon ? (
            <SiTicktick size={28} className="pl-2" />
          ) : (
            <AiOutlineSave size={28} className="pl-2" />
          )}
        </button>

        <button
          className="flex items-center px-2 py-1 text-sm text-teal-500 border-2 border-teal-500 rounded-lg font-medium transition-all hover:bg-teal-500/10 active:scale-95 active:bg-teal-500/30 disabled:opacity-50 disabled:pointer-events-none"
          onClick={handleClearWorkflow}
          disabled={!nodes?.length}
        >
          Clear Workflow
          {showTrashIcon ? (
            <SiTicktick size={28} className="pl-2" />
          ) : (
            <IoTrashBinOutline size={28} className="pl-2" />
          )}
        </button>

        <button
          className="flex items-center px-2 py-1 text-sm text-teal-500 border-2 border-teal-500 rounded-lg font-medium transition-all hover:bg-teal-500/10 active:scale-95 active:bg-teal-500/30 disabled:opacity-50 disabled:pointer-events-none"
          onClick={handleResetClick}
          disabled={!nodes?.length}
        >
          Reset Workflow
          {showResetIcon ? (
            <SiTicktick size={28} className="pl-2" />
          ) : (
            <RxReset size={28} className="pl-2" />
          )}
        </button>
      </div>
    </header>
  );
}
