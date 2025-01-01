const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/html/addberita.html', (req, res) => {
    res.sendFile(__dirname + '/html/addberita.html');
});

app.get('/html/editberita.html', (req, res) => {
    res.sendFile(__dirname + '/html/editberita.html');
});


app.post('/saveJson', (req, res) => {
    const newJsonData = req.body;
    console.log('Received data:', newJsonData);

    fs.readFile('data/berita.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).send('Error reading data');
            return;
        }
        console.log('Read data:', data);

        let beritaArray = [];

        if (data) {
            try { 
                beritaArray = JSON.parse(data); 
            } catch (parseError) { 
                console.error('Error parsing data:', parseError); 
                res.status(500).send('Error parsing data'); 
                return; 
            }
        }
        //console.log('Parsed data:', beritaArray);

        if (!newJsonData.id) { 
            newJsonData.id = beritaArray.length ? beritaArray[beritaArray.length - 1].id + 1 : 1; 

        }

        const index = beritaArray.findIndex(berita => berita.id === newJsonData.judul);
        if (index !== -1) {
            beritaArray[index] = newJsonData;
        } else {
            beritaArray.push(newJsonData);
        }

        fs.writeFile('data/berita.json', JSON.stringify(beritaArray, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error saving data:', err);
                res.status(500).send('Error saving data');
            } else {
                console.log('Data successfully saved');
                res.send('Data successfully updated');
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Get Berita by ID
app.get('/getBerita', (req, res) => {
    const beritaId = parseInt(req.query.id);
    fs.readFile('data/berita.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).send('Error reading data');
            return;
        }
        let beritaArray = [];
        if (data) {
            try { 
                beritaArray = JSON.parse(data); 
            } catch (parseError) { 
                console.error('Error parsing data:', parseError); 
                res.status(500).send('Error parsing data'); 
                return; 
            }
        }

        const berita = beritaArray.find(item => item.id === beritaId);
        if (berita) {
            res.send(berita);
        } else {
            res.status(404).send('Berita not found');
        }
    });
});

// Update Berita
app.post('/updateBerita', (req, res) => {
    const updatedData = req.body;
    fs.readFile('data/berita.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).send('Error reading data');
            return;
        }
        let beritaArray = [];
        if (data) {
            try { 
                beritaArray = JSON.parse(data); 
            } catch (parseError) { 
                console.error('Error parsing data:', parseError); 
                res.status(500).send('Error parsing data'); 
                return; 
            }
        }

        const index = beritaArray.findIndex(berita => berita.id === updatedData.id);
        if (index !== -1) {
            beritaArray[index] = updatedData;
        } else {
            beritaArray.push(updatedData);
        }

        fs.writeFile('data/berita.json', JSON.stringify(beritaArray, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error saving data:', err);
                res.status(500).send('Error saving data');
            } else {
                console.log('Data successfully saved');
                res.send('Data successfully updated');
            }
        });
    });
});
