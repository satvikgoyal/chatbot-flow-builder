'use client';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, {
  Background,
  Controls,
  Position,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';

import SettingsPanel from './SettingsPanel';
import TextMessageNode from './nodes/TextMessageNode';
import CustomisedEdge from './edges/CustomisedEdge';
import ChatbotHeader from './ChatbotHeader';

/**
 * declaring custom node type,
 * can be declared inside component
 * but we should use useMemo
 * to prevent reinitializing every time component renders.
*/
const nodeTypes = {
  text: TextMessageNode,
};

/**
 * declaring custom edge type,
 * can be declared inside component
 * but we should use useMemo
 * to prevent reinitializing every time component renders.
*/
const edgeTypes = {
  'custom-edge': CustomisedEdge,
};

const getId = () => uuidv4();

export default function ChatWorkflow() {
  const chatbotFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRFInstance] = useState(null);

  /**
   * state to change the node creation panel
   * to node edition panel
   */
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [showSaveIcon, setShowSaveIcon] = useState(false);
  const [showResetIcon, setShowResetIcon] = useState(false);
  const [showTrashIcon, setShowTrashIcon] = useState(false);

  //show alert modal
  const [modalData, setModalData] = useState('');
  /**
   * whenever a node is connected to another node,
   * this function will be called to add the edge
   */
  const handleNodeConnection = useCallback(
    newConnection =>
      setEdges(edg => {
        // source and target can have M:1 relationship

        // if the source node is already connected to another node
        // then do nothing
        if (edg && edg.some(e => e.source === newConnection.source)) {
          //show error message
          setModalData('Source node is already connected to another node');

          return edg;
        } else if (edg && edg.some(e => e.target === newConnection.target)) {
          /**
           * if target is connected to another node let it connect with another node
           * because tagret has 1:M relationship with sources
           * */
          return addEdge({...newConnection, animated: true}, edg);
        } else {
          /**
           * if the two nodes are not connected to any other node,
           * we are going to show a pointer edge, which the custom edge
           * we have created
           */
          return addEdge({...newConnection, type: 'custom-edge', animated: true}, edg);
        }
      }),
    [],
  );

  /**
   * Handle the dragover event to enable dropping by preventing the default behavior
   * and setting the desired drop effect to move
   */
  const handleDrag = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handle the drop event to create and add a new node to the flow
   * Creates a new node based on the type of the dropped element
   * Adds the new node to the nodes array
   * Sets the position of the new node to the current mouse position
   */
  const handleDrop = useCallback(
    event => {
      event.preventDefault();

      // validating if the dropped element is correct
      // we are getting type of the node from the dataTransfer
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // getting the cordinates for drop position
      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // creating a new node
      const newId = getId();
      const newNode = {
        id: newId,
        type,
        position,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {value: `${type} ${newId}`, onClick: () => handleNodeClick(null, {id: newId})},
      };
      setNodes(nodes => nodes.concat(newNode));
    },
    [rfInstance],
  );

  /**
   * on node selection, change to setting panel
   */
  const handleNodeClick = (_, node) => setSelectedMessage(node);

  /**
   * function to be called when
   * node message needs to be updated
   */
  const updateSelectedMessage = value => {
    if (!selectedMessage) {
      return;
    }

    setNodes(nodes =>
      nodes?.map(node => {
        if (node?.id === selectedMessage?.id) {
          node.data.value = value;
        }

        return node;
      }),
    );
  };

  /**
   * function to be called when workflow is saved,
   * error message needs to be displayed if more than 1 node
   * remains unconnected.
   */
  const validateFlow = () => {
    if(!nodes?.length){
      return;
    }

    const sourceNodes = new Set();
    const targetNodes = new Set();

    edges.forEach(edge => {
      sourceNodes.add(edge.source);
      targetNodes.add(edge.target);
    });

    // nodes without source and target handles
    const nodesWithoutSourceAndTarget = nodes.filter(
      node => !sourceNodes.has(node.id) && !targetNodes.has(node.id),
    );

    if (nodesWithoutSourceAndTarget.length > 0) {
      setModalData('More than one nodes without source and target connections');
    } else {
      saveFlowToLocal();
    }
  };

  // save the flow to local storage, to preserve the workflow
  const saveFlowToLocal = () => {
    localStorage.setItem('flow', JSON.stringify({nodes, edges}));
    setShowSaveIcon(true);
  };

  //reseting to older saved version of worflow, by getting workflow back from local storage
  const resetFlowFromLocal = () => {
    const flow = localStorage.getItem('flow');
    const {nodes, edges} = JSON.parse(flow);

    if(nodes?.length === 1 || (nodes && edges)){
      setNodes(nodes);
      setEdges(edges);
    }else{
      localStorage.removeItem('flow')
      setNodes([]);
      setEdges([]);
    }

    setShowResetIcon(true);
  }

  //deleting the flow from local storage itself
  const clearFlowFromLocal = () => {
    const flow = localStorage.getItem('flow');

    if(!flow){
      return;
    }

    localStorage.removeItem('flow')
    setNodes([]);
    setEdges([]);
    setShowTrashIcon(true);
  }

  /**
   * showing a saved icon when saved
   * and then hiding it after 800ms
   */
  let timeout;
  useEffect(() => {
    if (showSaveIcon) {
      timeout = setTimeout(() => {
        setShowSaveIcon(false);
      }, 800);
    }

    if (showResetIcon){
      timeout = setTimeout(() => {
        setShowResetIcon(false);
      }, 800);
    }

    if (showTrashIcon){
      timeout = setTimeout(() => {
        setShowResetIcon(false);
      }, 800);
    }
    return () => clearTimeout(timeout);
  }, [showSaveIcon, showResetIcon, showTrashIcon]);

  //to close alert modal
  let alertTimeout;
  useEffect(() => {
    if (modalData) {
      alertTimeout = setTimeout(() => {
        setModalData('');
      }, 3000);
    }

    return () => clearTimeout(alertTimeout);
  }, [modalData]);

  // get the flow from local storage, on page load
  useEffect(() => {
    const flow = localStorage.getItem('flow');
    if (flow) {
      const {nodes, edges} = JSON.parse(flow);
      setNodes(nodes);
      setEdges(edges);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div
        className={` transition-all duration-500 ease-in-out  overflow-hidden flex justify-center items-center ${
          modalData === '' ? 'w-0 h-0 opacity-0 z-0' : 'w-screen h-screen fixed inset-0'
        } bg-black/50`}>
        <dialog
          className="w-4/12 px-4 py-2 bg-red-100 border-red-700 border space-y-2 rounded-lg flex-col"
          open>
          <div>
            <h1 className="text-4xl text-red-700 font-black">Error!</h1>
          </div>
          <hr className="border-red-700" />
          <div>
            <p className="text-red-500">{modalData}</p>
          </div>
        </dialog>
      </div>
      <ChatbotHeader
        handleSaveClick={validateFlow}
        showSaveIcon={showSaveIcon}
        handleResetClick={resetFlowFromLocal}
        showResetIcon={showResetIcon}
        nodes={nodes}
        showTrashIcon={showTrashIcon}
        handleClearWorkflow={clearFlowFromLocal}
      />
      <div
        className={`flex flex-row flex-grow h-full ${
          modalData ? 'opacity-10 pointer-events-none ' : 'opacity-100'
        }`}>
          <ReactFlowProvider>
          <div className="reactflow-wrapper w-3/4 h-full" ref={chatbotFlowWrapper}>
            <ReactFlow
              fitView
              nodes={nodes}
              edges={edges}
              onInit={setRFInstance}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              handleDrop={handleDrop}
              onDrag={handleDrag}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={handleNodeConnection}
              onNodeClick={handleNodeClick}
              onPaneClick={() => setSelectedMessage(null)}
              onEdgeClick={() => setSelectedMessage(null)}
              // onNodesDelete={() => setSelectedMessage(null)}
              //for multiselect delete, "Meta" for MacOs, "Control" for other systems
              multiSelectionKeyCode={'Meta'}
              >
              <MiniMap nodeStrokeWidth={3}/>
              <Background />
              <Controls />
            </ReactFlow>
          </div>

          <div className="flex-grow border-s">
            <SettingsPanel
              selectedMessage={selectedMessage}
              onMessageDeselection={() => setSelectedMessage(null)}
              updateSelectedMessage={value => updateSelectedMessage(value)}
            />
          </div>
          </ReactFlowProvider>
        </div>
    </div>
  );
}
