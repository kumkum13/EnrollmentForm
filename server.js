const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EnrollmentDB'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Handle form submission
app.post('/submit-enrollment', (req, res) => {
    const { firstName, lastName, email, phone, dob, gender, streetAddress, city, state, zipCode, country, qualification, institution, graduationYear, grade, program, startDate, studyMode, nationality, termsAccepted } = req.body;

    const sql = 'INSERT INTO Students SET ?';
    const student = { firstName, lastName, email, phone, dob, gender, streetAddress, city, state, zipCode, country, qualification, institution, graduationYear, grade, program, startDate, studyMode, nationality, termsAccepted };

    db.query(sql, student, (err, result) => {
        if (err) throw err;
        res.send('Student data saved to database');
    });
});

// Default route to serve the form (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
