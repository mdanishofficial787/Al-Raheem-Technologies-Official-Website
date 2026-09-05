const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ExcelJS = require('exceljs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  projectType: String,
  reason: String
});

// Create a model for the form data
const FormData = mongoose.model('FormData', formDataSchema);

// Create an Excel workbook and worksheet
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('FormData');

// Set the header row
worksheet.addRow(['Name', 'Email', 'Phone', 'Project Type', 'Reason']);

// Create a route to handle the form submission
app.post('/submit', (req, res) => {
  const formData = new FormData(req.body);
  formData.save((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving form data');
    } else {
      // Add the form data to the Excel worksheet
      worksheet.addRow([
        data.name,
        data.email,
        data.phone,
        data.projectType,
        data.reason
      ]);

      // Save the Excel file
      workbook.xlsx.writeFile('form-data.xlsx')
        .then(() => {
          res.send('Form data saved successfully!');
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error saving Excel file');
        });
    }
  });
});