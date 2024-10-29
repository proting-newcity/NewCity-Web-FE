const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Serve static files (your HTML, CSS, JS, and JSON files)
app.use(express.static(path.join(__dirname, '')));

// Endpoint to handle updating JSON data
app.post('/save-json', (req, res) => {
    const updatedData = req.body;
    const filePath = path.join(__dirname, 'js', 'berita.json'); // Path to your JSON file

    fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.status(200).send('File successfully updated');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
