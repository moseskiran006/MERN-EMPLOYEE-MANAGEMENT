import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get('http://localhost:5000/api/employees');
    setEmployees(res.data);
  };

  const handleChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value
    });
  };

  const handleAddEmployee = async () => {
    await axios.post('http://localhost:5000/api/employees', newEmployee);
    setNewEmployee({ name: '', position: '', department: '', salary: '' });
    fetchEmployees();
  };

  const handleDeleteEmployee = async (id) => {
    await axios.delete(`http://localhost:5000/api/employees/${id}`);
    fetchEmployees();
  };

  return (
    <motion.div className="App"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Employee Management System</h1>

      {/* Input Form with Animation */}
      <motion.div 
        className="form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <input name="name" placeholder="Name" value={newEmployee.name} onChange={handleChange} />
        <input name="position" placeholder="Position" value={newEmployee.position} onChange={handleChange} />
        <input name="department" placeholder="Department" value={newEmployee.department} onChange={handleChange} />
        <input name="salary" placeholder="Salary" value={newEmployee.salary} onChange={handleChange} />
        
        {/* Button with scale effect */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddEmployee}
        >
          Add Employee
        </motion.button>
      </motion.div>

      {/* Animated Employee List */}
      <ul className="employee-list">
        <AnimatePresence>
          {employees.map(emp => (
            <motion.li key={emp._id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="employee-item"
            >
              {emp.name} - {emp.position} - {emp.department} - ${emp.salary}
              
              {/* Delete button with animation */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDeleteEmployee(emp._id)}
              >
                Delete
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}

export default App;
