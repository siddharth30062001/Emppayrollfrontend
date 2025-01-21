import React, {useState,useEffect} from 'react';
import Header from './Header';
import image1 from '../image1.jpg'
import image2 from '../image2.jpg';
import image3 from '../image3.jpg';
import image4 from '../image4.jpg';
import UserService from '../service/UserService';
import { useParams, Link } from 'react-router-dom';


import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Container,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    name: '',
    profileImage: '',
    gender: '',
    department: [],
    salary: '',
    startDate: '',
    notes: '',
    id: '',
    isUpdate: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      department: checked
        ? [...prevData.department, value]
        : prevData.department.filter((dept) => dept !== value),
    }));
  };
  useEffect(() => {
    if (params.id) {
      UserService.getEmployee(params.id)
        .then((response) => {
          const userData = response.data;
          setFormData({
            ...formData,
            ...userData,
            profileImage: userData.imageUrl, 
            isUpdate: true,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [params.id]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { isUpdate, ...data } = formData;
      console.log(data);
      
    if (isUpdate) {
      if (window.confirm("Data once modified cannot be restored. Continue?")) {
        UserService.updateEmployee(params.id, data,data.profileImage)
          .then(() => {
            alert("Data updated successfully!");
            navigate("/"); // Redirect or refresh
          })
          .catch((error) => {
            console.error("Error updating data:", error);
            alert("Error updating data!");
          });
      }
    } else {
      UserService.addEmployee(data,formData.profileImage).then((response) => {
        console.log('User Added:', response.data);
      }).catch((error) => {
        console.error('Error adding user:', error);
      });
    };
  };
  
  const handleClear = () => {
    setFormData({
      name: '',
      profileImage: '',
      gender: '',
      department: [],
      salary: '',
      startDate: '',
      notes: '',
    });
    console.log('Form cleared');
  };
  const handleReset = (event) => {
    event.preventDefault(); // Prevent default browser reset
    setFormData({
      name: '',
      profileImage: '',
      gender: '',
      department: [],
      salary: '',
      startDate: '',
      notes: '',
      isUpdate: formData.isUpdate,

    });
    console.log('Form reset');
  }      
  return (
    <>
      <Container
        style={{
          padding: '20px',
          backgroundColor: '#F7F7F7',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '80%',
        }}
      >
        <Header />
        <Container
          style={{
            padding: '50px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop:'20px'
          }}
        >
          <Typography variant="h6" gutterBottom style={{ color: '#42515F', marginBottom: '20px', fontWeight: 'bold' }}>
            Employee Payroll Form
          </Typography>
          <form id="employee-form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px' }}>
              Profile image
            </Typography>
            <RadioGroup
              row style={{ display: 'contents', alignItems: 'center' }}
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
            >
              <FormControlLabel value="../image1.jpg" control={<Radio />} label={<img src={image1} alt="image 1" style={{ width: 45, height: 45, borderRadius: '50%' }} />} />
              <FormControlLabel value="../image2.jpg" control={<Radio />} label={<img src={image2} alt="image 2" style={{ width: 45, height: 45, borderRadius: '50%' }} />} />
              <FormControlLabel value="../image3.jpg" control={<Radio />} label={<img src={image3} alt="image 3" style={{ width: 45, height: 45, borderRadius: '50%' }} />} />
              <FormControlLabel value="../image4.jpg" control={<Radio />} label={<img src={image4} alt="image 4" style={{ width: 45, height: 45, borderRadius: '50%' }} />} />
            </RadioGroup>
            <br></br>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px' }}>
              Gender
            </Typography>
            <RadioGroup
              row style={{display:'contents', alignItems: 'center'}}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            <br></br>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px' }}>
              Department
            </Typography>
            {['HR', 'Sales', 'Finance', 'Engineer', 'Others'].map((dept) => (
              <FormControlLabel  style={{ display:'contents', alignItems: 'center' }}
                key={dept}
                control={
                  <Checkbox
                    value={dept}
                    checked={formData.department.includes(dept)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={dept}
              />
            ))}
            <FormControl fullWidth margin="normal">
              <InputLabel>Salary</InputLabel>
              <Select
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              >
                <MenuItem value="20000">₹20,000</MenuItem>
                <MenuItem value="40000">₹40,000</MenuItem>
                <MenuItem value="60000">₹60,000</MenuItem>
                <MenuItem value="90000">₹90,000</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <div style={{ marginTop: '20px' }}>
              <Button variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white' }} type="submit">
                Submit
              </Button>
              <Button variant="outlined" style={{ marginLeft: '10px', borderColor: '#ccc', color: '#333' }} type="reset" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="outlined" style={{ marginLeft: '10px', borderColor: '#F44336', color: '#F44336' }} onClick={handleClear}>
                Clear
              </Button>
            </div>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default EmployeeForm;