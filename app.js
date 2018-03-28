const http      = require('http');
const express   = require('express');
const app       = express();
const db        = require('./db');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write("NODE APPP");
    res.end();
});

app.get('/students', (req, res) => {
    getStudents.then((result) => {
        res.json(result);
    });
});


app.post('/students', (req, res) => {
    console.log(req.body.params);
    console.log(req.body.name);
    console.log(req.body.age);
    console.log(req.body.std);

     createStudent(req.body).then(function(result, collection)
        {
            res.json({
                success: true,
                message: 'User Created Succesffully !',
                userInfo: req.body
            });
        });

});

app.listen(3003, () => {
    console.log("Connected");
});

var getStudents = new Promise((resolve, error) => {

        db.query('SELECT * FROM data_students', (err, result) => {
            resolve(result);
        });

});

var createStudent = function(collection) {
        return new Promise( (resolve, error) => {

            var sql = 'INSERT INTO data_students (name, age, std) VALUES ("'+ collection.name +'", "'+ collection.age + '", "'+collection.std+'")';

            console.log(sql);
            db.query(sql, (error, result) => {
                resolve(result);
            });
    });
}