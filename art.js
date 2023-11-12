const express = require('express');
const app = express();
const fs = require('fs');


let data = JSON.parse(fs.readFileSync('paintings.json', 'utf8'));
app.get('/', (req, res) => {
    res.json(data);
});
app.get('/:id', (req, res) => {
    const painting = data.find(p => p.paintingID == req.params.id);
    res.json(painting || { message: "Painting not found" });
});

// Route to get paintings by gallery ID
app.get('/gallery/:id', (req, res) => {
    const paintings = data.filter(p => p.gallery.galleryID == req.params.id);
    res.json(paintings);
});

// Route to get paintings by artist ID
app.get('/artist/:id', (req, res) => {
    const paintings = data.filter(p => p.artist.artistID == req.params.id);
    res.json(paintings);
});

// Route to get paintings within a year range
app.get('/year/:min/:max', (req, res) => {
    const paintings = data.filter(p => p.yearOfWork >= req.params.min && p.yearOfWork <= req.params.max);
    res.json(paintings);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});