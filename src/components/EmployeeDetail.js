import React,{useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button,Container, Typography, Paper, TableContainer} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';




const EmployeeDetail = () => {

    const [allEmployeeArray, setAllEmployeeArray] = useState([]);

    const navigate = useNavigate();

    // useEffect(() => {
    //     getAllEmployee();
    // }, []);
    const update =(employeeId) => { 
      navigate(`update/${employeeId}`);
     
  };

    useEffect(() => {
        UserService.getAllEmployee()
          .then((response) => {
            console.log(response.data); 
            setAllEmployeeArray(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);  

const remove = (id) => {
  console.log(id);
  var answer = window.confirm("Data once deleted cannot be restored!! Do you wish to continue ?");
      if(answer === true){
          UserService.deleteEmployee(id)
                  .then((data) => {
            alert("Data deleted successfully!!");
            window.location.reload();
            allEmployeeArray.getAllEmployee();        
          })
    .catch((error) => {
      console.log
      ("Something Went Wrong!");
    });
  }else{
    alert("Data Not Deleted")
  }
};

  return (
    <>
      <Container style={{ marginTop: '20px', padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Header />
          <Typography variant="h5"  style={{ color: '#333', fontWeight:'bold',marginTop: '20px',marginBottom:'20px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
              Employee Details
          <Button
              component={Link}
              to="/add"
              style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  marginBottom: '20px',
                  
              }}
          >
              + Add User
          </Button>
          </Typography>
          <TableContainer component={Paper} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                  <TableHead>
                      <TableRow style={{ backgroundColor: '#42515F', color: 'white' }}>

                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}></TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Salary</TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
         {allEmployeeArray && allEmployeeArray.map((employees, index) => (
            <TableRow key={index}>
              <TableCell><img src={employees.profileImage} style={{height:'50px',borderRadius: '80%'}}></img></TableCell>
              <TableCell>{employees.name}</TableCell>
              <TableCell>{employees.gender}</TableCell>
              <TableCell>{employees.department.join(', ')}
              </TableCell>
              <TableCell>₹{employees.salary}</TableCell>
              <TableCell>{employees.startDate}</TableCell>
              <TableCell>
              <img onClick={() => remove(employees.id)}
                      src="./icons8-delete.svg"
                      alt="delete" />
                    <img onClick={() => update(employees.id)}
                      src="./icons8-edit.svg"
                      alt="edit" />
      </TableCell>
    
              
                </TableRow>
))}
              </TableBody>
              </Table>
          </TableContainer>
      </Container>
      </>
  );
};
export default EmployeeDetail;