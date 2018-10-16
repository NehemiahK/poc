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
app.get('/api/singles/', (req,res) => {
  //console.log(req.query);

  //building the query based on paramaters sent in. 
  const singleQuery = {}; 

  let request = Object.entries(req.query);

  for (let param of request){
      let singleKey = param[0];
      let singleVal = param[1];

      if (singleKey == "maxAge"){
        singleKey = "dob >=";
      }
      if (singleKey == "minAge"){
          singleKey = "dob <=";
      }
      singleQuery[singleKey] = singleVal;

  }

  //console.log(singleQuery);

    qb.select('*')
        .where(singleQuery)
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