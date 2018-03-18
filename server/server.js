const express = require('express');
const bodyParser =require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

var fs = require('fs');
var obj;
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "45.40.164.55",
    user: "melanomamm802",
    password: "melanoma@802ALBERTA",
    database: "melanomamm802"
});

/*
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT time, year FROM melanoma", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});*/



fs.readFile('melanoma.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
});

app.use(express.static(path.resolve(__dirname, '../client/dist/')));



app.get('/api', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(obj))
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));