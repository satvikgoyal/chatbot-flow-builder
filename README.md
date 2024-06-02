## Chatbot Flow Build - React Flow 🤖

**Description 📘**

The objective of this project is to develop a user-friendly and versatile Chatbot Flow Builder using the React framework 🤖. This tool will enable users to easily create and manage chatbot conversation flows through a graphical
interface 🧑‍💻. Users can connect multiple message nodes to define the sequence and logic of chatbot interactions. Each node represents a specific message or action 💬, and users can arrange these nodes by dragging and dropping them ⬆️,
thereby creating a clear visual representation of the chatbot’s flow . Additionally, the builder will support functionalities for saving the chat workflow ✅, resetting to previous workflows ↩, and clearing the current workflow ❌.

**Features 😻**

- **Text Nodes:** Define individual text messages as nodes in the chatbot flow.
- **Connectors (Edges):** Link nodes to specify the sequence of interactions.
- **Drag and Drop:** Easily add and arrange nodes using a drag-and-drop interface.
- **Nodes Panel:** Contains all node types supported, with future extensibility for additional nodes.
- **Settings Panel:** Allows editing of node details when selected, replacing the Nodes Panel.
- **Validation:** Saves the current flow, with error handling for nodes with empty target handles.
- **Local Storage:** Save the workflow locally to preserve state.
- **Workflow Reset:** Reset to a previous workflow at any time.
- **Clear Workflow:** Clear the entire workflow with a single action.
- **Multiselect Delete:** Select and delete multiple nodes simultaneously. Will work for only Mac for now.
- **Minimap:** Provides a compact overview of the entire workflow for easy navigation.

## Prerequisites 🧪

- **Package manager:** Node.js and npm install on your machines. Node version >= 18

## Getting Started 🚀

First intall the dependencies and run the developement server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) within your browser to see the result.

## User Workflow 🛠️

- **Add a Text Meesage:** Drag and drop the Message Node from the settings panel, to create a new message node.
- **Edit Message:** Click on a message node to edit its content.
- **Connect Messages:** Drag from the source point on one message to another message target to create an edge.
- **Save Flow:** Once your flow is complete, click on the "Save" button to save your flow configuration.
- **Check Validation:** Add a new message node and click on the "Save" button to see how validation is working.
- **Reset Workflow:** Now reset the workflow to its older state.
- **Clear Workflow:** Now clear the whole workflow in a single go.

## Future Scope 🔮

This project is designed for easy enhancement. Here are some ways to extend its capabilities:

- **Additional Node Types:** Add new types of nodes (e.g. input nodes) by creating components in the `components/nodes` folder.
- **Create custom editor:** Add custom editors for the respective Node type as well. This can be done by creating a new component in `components/editors` folder.

## References 🔗

- [React Flow Documentation](https://reactflow.dev/docs)
