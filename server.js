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


app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'Develop', 'public', 'notes.html'));
})

// app.get('/notes', function (req, res) {
//     res.sendFile('./assets/notes.html')
// })

//Listner

app.post('/api/notes', function (req, res) {
    //Read our file and get data
    fs.readFile(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8', function (err, data) {
        if (err) throw err;
        const db = JSON.parse(data);
        console.log(db, req.body);
        db.push(req.body)
        const stringdb = JSON.stringify(db)
        fs.writeFile(path.join(__dirname, 'Develop', 'db', 'db.json'), stringdb, 'utf8', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            res.status(200).json({
                message: 'File saved'
            })
        });
    }); //"{"name": "bob"}" data.name => error

    //Parse Data into object


    //Add req.body => {title: text}

    //We need to re-stringfy the data

    //Save back to db.json
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'Develop', 'public', 'index.html'));
})


app.listen(PORT, function () {
    console.log('Listening on PORT ' + PORT)
});