const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');  // Add this line

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));  // And use this line

app.use(bodyParser.json());

app.use(express.static('NewCity-Web-FE')); // Assuming your HTML files are in a folder named "public"

app.post('/saveJson', (req, res) => {
    const jsonData = req.body;
    fs.writeFile('js/berita.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error saving data');
        } else {
            res.send('Data successfully updated');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
