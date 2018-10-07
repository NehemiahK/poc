const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Sequelize = require('sequelize');

// connection details
// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'a97nhHEY!lks',
//     database:'poc'
// });
const sequelize = new Sequelize('poc', 'root', 'a97nhHEY!lks', {
    dialect: 'mysql',
    host: "localhost",
    // port: 5000,
  })


//connect 
// db.connect( (err) => {
//     if(err){
//         throw err;
//     }
//     console.log('MySql Connected...');
// })


const app = express();
app.use(bodyParser.json());

const Singles = sequelize.define('singles', {
    first_name:Sequelize.STRING,
    last_name:Sequelize.STRING,
    dob:Sequelize.DATE,
    picture:Sequelize.STRING,
    height:Sequelize.SMALLINT,
    religiously:Sequelize.STRING,
    dating_status:Sequelize.STRING,
    gender:Sequelize.STRING,
    occupation:Sequelize.STRING,
    blurb:Sequelize.TEXT,
    location:Sequelize.STRING,
},
{timestamps:false}// dont include the default timestamps 
)

app.post('/api/test',jsonParser, (req,res) => {
    console.log(req.body); // log the incoming request 
    Singles.findAll({
        raw: true,
        where: req.body // set conditions
          //first_name: req.body.name,
          //gender: 'male'
        
      }).then(result => res.json(result));
});


const port = 5000;
app.listen(port, () => console.log(`server on port ${port}`));