import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [tableData, setTableData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = tableData.slice(start, end);
  
  const handlePrevious = () => {
    if(currentPage > 1){
      setCurrentPage((prev) => prev - 1);
    }
  }

  const handleNext = () => {
    if(currentPage < totalPages){
      setCurrentPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
    .then((response) => response.json())
    .then((data) => setTableData(data))
    .catch((e) => {
      console.error("Error fetching data", e);
    })
  }, [])

  return (
    <div className='App'>
      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <thead style={{ height:"40px", color:"white",  marginBottom:"20px"}}>
          <tr style={{backgroundColor:"#00997a",}}>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
          <tr style={{ borderBottom:"1px solid grey"}}>
            <td style={{height:"40px",}}>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:"20px"}}>
          <button type='button'
            disabled={currentPage === 1}
            onClick={handlePrevious}
            style={{
                padding:"5px 10px",
                marginRight: "10px",
                border: "1px solid grey",
                backgroundColor: "#00997a",
                borderRadius: "5px",
                color:"white",
            }}
          >Previous</button>

          <span
            style={{
                padding:"9px 12px",
                marginRight: "10px",
                border: "1px solid grey",
                backgroundColor: "#00997a",
                borderRadius: "5px",
                color:"white",
            }}
          >{currentPage}</span>

          <button type='button'
            disabled={currentPage === totalPages}
            onClick={handleNext}
            style={{
                padding:"5px 10px",
                marginRight: "10px",
                border: "1px solid grey",
                backgroundColor: "#00997a",
                borderRadius: "5px",
                color:"white",
            }}
          >Next</button>
      </div>
    </div>
  );
}

export default App;