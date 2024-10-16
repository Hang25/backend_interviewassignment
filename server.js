const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

let database = [];

app.use(bodyParser.json());

// POST route to handle incoming data
app.post('/submit', (req, res) => {
    console.log('Received POST request:', req.body);  // Log incoming request

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.log('Missing fields in request');
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Add the data to the in-memory database
    database.push({ name, email, message });
    console.log('Data added to database:', { name, email, message });  // Log successful data addition

    return res.status(200).json({ message: 'Data received successfully!' });
});

// GET route to return all data
app.get('/data', (req, res) => {
    console.log('Returning database content:', database);  // Log returning data
    return res.json(database);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});