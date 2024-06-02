import {Handle} from 'reactflow';

/**
 * common component to initialize
 * source and target node handles
 */
export default function CustomHandlers({type, position}) {
  return (
    <Handle
      type={type}
      position={position}
      className="group-hover:scale-150 scale-90 transition-all duration-500 ease-in-out"
      style={{
        width: 10,
        height: 10,
        background: 'white',
        border: '1px solid #000',
      }}
    />
  );
}
