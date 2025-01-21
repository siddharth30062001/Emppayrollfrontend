import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetail from './components/EmployeeDetail';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeDetail />} />
      <Route path="/add" element={<EmployeeForm />} />
      <Route path="/update/:id" element={<EmployeeForm />} />

    </Routes>
  );
};

export default App;