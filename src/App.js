import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios'; // Import Axios library for making HTTP requests
import './styles.css';

function App() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000');
      setRowData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Define column definitions based on the keys of the data objects
  const columnDefs = [
    { headerName: 'Buyer Address', field: 'buyer_address' },
    { headerName: 'Buyer Name', field: 'buyer_name' },
    { headerName: 'Client ID', field: 'client_id' },
    { headerName: 'Invoice Amount', field: 'invoice_amount' },
    { headerName: 'Invoice Date', field: 'invoice_date' },
    { headerName: 'Invoice Number', field: 'invoice_number' },
    { headerName: 'Net D', field: 'net_d' },
    { headerName: 'Original Filename', field: 'original_filename' },
    { headerName: 'Payment Due Date', field: 'payment_due_date' },
    { headerName: 'Payto Name', field: 'payto_name' },
    { headerName: 'PO Number', field: 'po_number' },
    { headerName: 'Seller Address', field: 'seller_address' },
    { headerName: 'Seller Email', field: 'seller_email' },
    { headerName: 'Seller Name', field: 'seller_name' },
    { headerName: 'Seller Phone', field: 'seller_phone' },
    { headerName: 'Shipto Address', field: 'shipto_address' },
    { headerName: 'Shipto Name', field: 'shipto_name' },
    { headerName: 'Subtax %', field: 'subtax_%' },
    { headerName: 'Subtax Amount', field: 'subtax_amount' },
    { headerName: 'Subtax Name', field: 'subtax_name' },
    { headerName: 'Subtotal', field: 'subtotal' },
    { headerName: 'Total Due Amount', field: 'total_due_amount' },
    { headerName: 'Total Tax', field: 'total_tax' },
    { headerName: 'Total Tax %', field: 'total_tax_%' }
  ];

  return (
    <div>
      <center>
        <h2>CSV File Upload</h2>
        <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: true,
              filter: true,
            }}
            pagination={true}
            paginationPageSize={10} // Set pagination page size to 10 rows per page
            rowGroupPanelShow={'always'} // Show row grouping panel always
            autoGroupColumnDef={{ headerName: 'Group', field: 'group' }} // Define auto group column
            enableRangeSelection={true} // Enable range selection for aggregation
          />
        </div>
      </center>
    </div>
  );
}

export default App;
