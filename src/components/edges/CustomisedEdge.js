import {BezierEdge, EdgeLabelRenderer} from 'reactflow';
import {FaCaretRight} from 'react-icons/fa';

export default function CustomisedEdge(props) {
  const {targetX, targetY} = props;

  return (
    <>
      <BezierEdge {...props} />

      {/* show a pointer edge if the target is connected to one source initially */}
      <EdgeLabelRenderer>
        <FaCaretRight
          size={20}
          className="text-black"
          style={{
            transform: `translate(-50%, -50%) translate(${targetX}px, ${targetY}px)`,
          }}
        />
      </EdgeLabelRenderer>
    </>
  );
}
