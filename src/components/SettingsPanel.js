'use client';

import React from 'react';
import NodeSelector from './NodeSelector';
import TextNodeEditor from './editors/TextNodeEditor';

export default function SettingsPanel(props) {
  const {selectedMessage, updateSelectedMessage, onMessageDeselection} = props;

  return (
    <div>
      {selectedMessage && selectedMessage?.type === 'text' ? (
        <TextNodeEditor
          onMessageDeselection={onMessageDeselection}
          selectedMessage={selectedMessage}
          updateSelectedMessage={updateSelectedMessage}
        />
      ) : (
        <div className="p-4">
          <NodeSelector />
        </div>
      )}
    </div>
  );
}
