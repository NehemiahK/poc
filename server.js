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



function getBirthday(key,val){
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let birthyear = year - val;
    let birthdate;
    let dob = "dob";
   
    if (key == "minAge"){
        birthdate = birthyear + '-' + (month + 1) + '-' + day;
        dob += " <=";
    }
    else{
        birthdate= (birthyear - 1) +   '-' + (month  - 1) + '-' + (day + 1);
        dob += " >=";
    }

    return [dob,birthdate];
}



//a POST api that reads the body of the request and returns matching singles
app.get('/api/singles/', (req,res) => {

  //building the query based on paramaters sent in. 
  const singleQuery = {}; 

  let request = Object.entries(req.query);

  for (let param of request){

      let singleKey = param[0];
      let singleVal = param[1];

      if (singleVal){
        if (singleKey == "maxAge" || singleKey == "minAge"){
            [singleKey,singleVal] = getBirthday(singleKey,singleVal)
          }
       
          singleQuery[singleKey] = singleVal;
      }
  }
 
  if (Object.keys(singleQuery) != 0 ){
    qb.select('*')
    .where(singleQuery)
    .get('singles', (err,response) => {
        res.json(response);
        //qb.disconnect();

        if (err) return console.error('cant get ' + err);

        console.log('query' + qb.last_query());

        console.log('result' , response);
      
    });
  }
  else{
    res.json([]);
  }   
});


const port = 5000;
app.listen(port, () => console.log(`server on port ${port}`));