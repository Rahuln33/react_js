import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Papa from 'papaparse'; // Import PapaParse library for CSV parsing
import './styles.css';

function App() {
  const [gridOptions, setGridOptions] = useState({
    columnDefs: [],
    rowData: [],
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      parseCSV(contents);
    };

    reader.readAsText(file);
  };

  const parseCSV = (contents) => {
    Papa.parse(contents, {
      header: true,
      complete: function(results) {
        const columnDefs = Object.keys(results.data[0]).map((columnName) => ({
          field: columnName,
          sortable: true,
          filter: true,
        }));
        setGridOptions({
          columnDefs,
          rowData: results.data,
        });
      }
    });
  };
  
  return (
    <div>
      <center>
        <h2>CSV File Upload</h2>
        <input type="file" id="fileInput" accept=".csv" onChange={handleFile} />
        <br />
        <br />
        <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
          <AgGridReact
            columnDefs={gridOptions.columnDefs}
            rowData={gridOptions.rowData}
            defaultColDef={{
              sortable: true,
              filter: true,
            }}
          />
        </div>
      </center>
    </div>
  );
}

export default App;
