 const ResultTable = ({ data }) => {
    if (!data || data.length === 0) {
      return <p>No rows returned</p>;
    }
  
    const columns = Object.keys(data[0]);
  
    return (
      <div className="result-table">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
  
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }; 

    export default ResultTable;
