const express = require('express');
//const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//const Sequelize = require('sequelize');

//connection settings to mysql
const settings = {
    host:'localhost',
    database:'poc',
    user:'root',
    password:'a97nhHEY!lks' 
};



const app = express();
app.use(bodyParser.json());

const qb = require('node-querybuilder').QueryBuilder(settings);

//a POST api that reads the body of the request and returns matching singles
app.post('/api/singles',jsonParser, (req,res) => {
  console.log(req.body);
    qb.select('*')
        .where(req.body)
        .get('singles', (err,response) => {
            res.json(response);
            //qb.disconnect();

            if (err) return console.error('cant get ' + err);

            console.log('query' + qb.last_query());

            console.log('result' , response);
          
        });
});


const port = 5000;
app.listen(port, () => console.log(`server on port ${port}`));