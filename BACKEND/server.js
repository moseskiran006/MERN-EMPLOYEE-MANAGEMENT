const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => console.error('Error connecting to MongoDB:', error));

// Employee Model
const EmployeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model('Employee', EmployeeSchema);

// API Routes
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/api/employees', async (req, res) => {
  const { name, position, department, salary } = req.body;
  const newEmployee = new Employee({ name, position, department, salary });
  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.put('/api/employees/:id', async (req, res) => {
  const { name, position, department, salary } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { name, position, department, salary }, { new: true });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
