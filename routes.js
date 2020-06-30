const fs = require('fs');

const path = require('path');

module.exports = function (app) {



    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, 'Develop', 'public', 'notes.html'));
    })

    // app.get('/notes', function (req, res) {
    //     res.sendFile('./assets/notes.html')
    // })

    //Listner
    app.get('/api/notes', function (req, res) {
        fs.readFile(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8', function (err, data) {
            if (err) throw err;
            const db = JSON.parse(data);
            res.json(db)
        })
    })

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
                console.log('file has been saved!');
                res.status(200).json({
                    message: 'File saved'

                })
            });
        });
    })
    app.delete('/api/notes/:id', function (req, res) {
        //Read our file and get data
        fs.readFile(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8', function (err, data) {
            if (err) throw err;
            const db = JSON.parse(data);
            console.log(db, req.params.id);
            db.splice(req.params.id, 1)
            const stringdb = JSON.stringify(db)
            fs.writeFile(path.join(__dirname, 'Develop', 'db', 'db.json'), stringdb, 'utf8', (err) => {
                if (err) throw err;
                console.log('file has been saved!');
                res.status(200).json({
                    message: 'File saved'

                })
            });
        });
    })

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'Develop', 'public', 'index.html'));
    })
}