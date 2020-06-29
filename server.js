const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'Develop', 'public')));

//Routes

const addRoutes = require('./routes.js')

addRoutes(app)


app.listen(PORT, function () {
    console.log('Listening on PORT ' + PORT)
});