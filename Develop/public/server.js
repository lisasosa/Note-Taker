const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;

//Routes

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'notes.html'));
})

// app.get('/notes', function (req, res) {
//     res.sendFile('./assets/notes.html')
// })

//Listner

app.listen(PORT, function () {
    console.log('Listening on PORT ' + PORT)
});