 
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';

SqlEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  height: PropTypes.string,
};

export default function SqlEditor({ value, onChange, height = "400px" }) {
  const [editorLoaded, setEditorLoaded] = useState(false);

  function handleEditorDidMount() {
    setEditorLoaded(true);
  }

  return (
    <div className="sql-editor">
      {!editorLoaded && <div>Loading editor...</div>}

      <Editor
        height={height}
        defaultLanguage="sql"
        value={value}
        onChange={onChange}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}