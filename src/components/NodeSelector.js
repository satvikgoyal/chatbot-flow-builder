import {BiMessageRoundedDetail} from 'react-icons/bi';

const nodeTypes = [
  {
    type: 'text',
    value: 'Message',
    icon: BiMessageRoundedDetail,
    disabled: true,
  },

  // NOTE: add more nodes types like above here...
];

export default function NodeSelector({}) {
  const handleDrag = (event, node) => {
    // we'll send the type of the node to the drop event
    // so we can create a new node with the type of the dropped element
    event.dataTransfer.setData('application/reactflow', node.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <h1 className="text-lg font-medium mb-3">Select a message</h1>

      <div className="flex flex-wrap justify-between">
        {nodeTypes.map(Node => (
          <div
            key={Node.type}
            onDragStart={event => handleDrag(event, Node)}
            draggable
            className="flex flex-col items-center justify-between p-4 my-2 bg-white border-2 border-teal-500 rounded-lg font-medium transition-all w-[48%] active:scale-95 cursor-pointer">
            <div className="rounded-full mb-5">
              <Node.icon size={24} className="text-teal-500" />
            </div>

            <span className="text-base select-none text-teal-500">{Node.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
