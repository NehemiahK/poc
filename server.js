const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//const Sequelize = require('sequelize');

// connection details
// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'a97nhHEY!lks',
//     database:'poc'
// });
// const sequelize = new Sequelize('poc', 'root', 'a97nhHEY!lks', {
//     dialect: 'mysql',
//     host: "localhost",
//     // port: 5000,
//   })


//connect 
// db.connect( (err) => {
//     if(err){
//         throw err;
//     }
//     console.log('MySql Connected...');
// })
const settings = {
    host:'localhost',
    database:'poc',
    user:'root',
    password:'a97nhHEY!lks' 
};



const app = express();
app.use(bodyParser.json());

// const Singles = sequelize.define('singles', {
//     first_name:Sequelize.STRING,
//     last_name:Sequelize.STRING,
//     dob:Sequelize.DATE,
//     picture:Sequelize.STRING,
//     height:Sequelize.SMALLINT,
//     religiously:Sequelize.STRING,
//     dating_status:Sequelize.STRING,
//     gender:Sequelize.STRING,
//     occupation:Sequelize.STRING,
//     blurb:Sequelize.TEXT,
//     location:Sequelize.STRING,
// },
// {timestamps:false}// dont include the default timestamps 
// )

const qb = require('node-querybuilder').QueryBuilder(settings);
app.post('/api/test',jsonParser, (req,res) => {
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