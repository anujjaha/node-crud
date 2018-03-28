var mysql     = require('mysql')
let host        = 'localhost',
    user        = 'root',
    password    = 'root',
    database    = 'node';

var connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

connection.connect((err) => {
    if(err)
        throw err;

    console.log("DB Connected !");
});

module.exports = connection;