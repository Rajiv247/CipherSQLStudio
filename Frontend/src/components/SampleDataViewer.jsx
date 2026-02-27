 
 const SampleDataViewer = ({ tables }) => {

    if (!tables || tables.length === 0) {
      return <div>No sample data available</div>;
    }
  
    return (
      <div className="sample-viewer">
  
        {tables.map((table, index) => {
  
          return (
            <div key={index} className="table-block">
  
              <h4>Table: {table.name}</h4>
  
              <div className="schema">
                <strong>Columns:</strong>
  
                <ul>
                  {table.schema &&
                    table.schema.map((column, i) => (
                      <li key={i}>
                        {column.column} ({column.type})
                      </li>
                    ))
                  }
                </ul>
              </div>
  
              <div className="rows">
                <strong>Sample rows:</strong>
  
                <pre>
                  {JSON.stringify(table.sampleRows, null, 2)}
                </pre>
              </div>
  
            </div>
          );
  
        })}
  
      </div>
    );
  };

   export default SampleDataViewer;