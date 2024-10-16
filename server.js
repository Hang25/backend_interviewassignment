const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;  // Heroku uses process.env.PORT

let database = [];

app.use(bodyParser.json());

// POST route to handle incoming data
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    database.push({ name, email, message });
    return res.status(200).json({ message: 'Data received successfully!' });
});

// GET route to return all data
app.get('/data', (req, res) => {
    return res.json(database);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});