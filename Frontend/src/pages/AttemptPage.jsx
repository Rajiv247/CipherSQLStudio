import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getAssignment, getSampleData, runQuery, getHint } from '../services/api';
import ResultTable from '../components/ResultTable';
import SampleDataViewer from '../components/SampleDataViewer';
import HintButton from '../components/HintButton';
import '../styles/AttemptPage.scss';

export const AttemptPage = () => {

  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [sampleData, setSampleData] = useState(null);
  const [code, setCode] = useState('SELECT * FROM employees LIMIT 5;');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);        
  const [queryError, setQueryError] = useState(null); // for execute errors, shown in results panel
  const [hint, setHint] = useState('');
  const [hintLoading, setHintLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [assignmentResponse, sampleResponse] = await Promise.all([
          getAssignment(id),
          getSampleData(id),
        ]);
        setAssignment(assignmentResponse.data);
        setSampleData(sampleResponse.data);
      } catch (err) {
        const msg = err.response?.data?.message || err.message || 'Failed to load assignment';
        setError(msg);
      }

      setLoading(false);
    };

    fetchData();

  }, [id]);

  const handleExecute = async () => {

    setResult(null);
    setQueryError(null);

    try {
      const response = await runQuery(code);
      setResult(response.data);
    } catch (err) {
      const message =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Query failed';
      setQueryError(message);
    }
  };

  const handleGetHint = async () => {

    setHint('');
    setHintLoading(true);

    try {
      const response = await getHint(
        assignment ? assignment.fullQuestion : '',
        code
      );
      setHint(response.data.hint);
    } catch (error) {
      setHint('Could not get hint right now');
    }

    setHintLoading(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="attempt-page">
      <div className="layout">

        <div className="left-panel">

          <div className="question-panel">
            <h2>{assignment ? assignment.title : 'Assignment'}</h2>
            <p className="question-text">
              {assignment ? assignment.fullQuestion : ''}
            </p>
          </div>

          <div className="sample-panel">
            <h3>Sample Data</h3>
            {sampleData ? (
              <SampleDataViewer tables={sampleData.tables ? sampleData.tables : []} />
            ) : (
              <p>No sample data available</p>
            )}
          </div>

        </div>

        <div className="right-panel">

          <div className="editor-panel">

            <div className="editor-header">
              <h3>Your SQL Query</h3>

              <div className="editor-actions">
                <HintButton
                  onClick={handleGetHint}
                  loading={hintLoading}
                />

                <button
                  className="execute-btn"
                  onClick={handleExecute}
                >
                  Execute
                </button>
              </div>
            </div>

            <Editor
              height="400px"
              defaultLanguage="sql"
              defaultValue={code}
              value={code}
              onChange={(value) => setCode(value ? value : '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
              }}
            />

            {hint ? (
              <div className="hint-box">
                <strong>Hint:</strong> {hint}
              </div>
            ) : null}

          </div>

          <div className="results-panel">
            <h3>Query Results</h3>

            {queryError ? (
              <div className="query-error">
                {queryError}
              </div>
            ) : result ? (
              result.success ? (
                <ResultTable data={result.data} />
              ) : (
                <div className="query-error">
                  Error: {result.message}
                </div>
              )
            ) : (
              <p>Run a query to see results</p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default AttemptPage;