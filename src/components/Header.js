import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './th.jpg';
// Ensure the correct relative path to the image file

const Header = () => {
    return (
        <AppBar
            position="relative"
            style={{
                backgroundColor: 'white',
                boxShadow: 'none',
                borderBottom: '2px solid #ccc',
            }}
        >
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 , maxWidth: '80%',maxHeight:'20px',display:'flex',
                                 alignItems: 'center' }}>
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={logo}
                            alt="Company Logo"
                            style={{ height: 40, marginRight: 10 }}
                        />
                         </Link>
                         <div style={{ textAlign: 'center'}}>
  <span
    style={{
      color: '#82A70C',
      fontSize: 18,
      fontWeight: 'bold',
      display:'contents'
    }}
  >
    EMPLOYEE
  </span>
  <span
    style={{
      color: '#42515F',
      fontSize: 18,
      fontWeight: 'bold',
      display: 'block',
    }}
  >
    PAYROLL
                   </span>
                     </div>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;