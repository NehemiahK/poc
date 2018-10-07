const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// connection details
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'a97nhHEY!lks',
    database:'poc'
});

//connect 
db.connect( (err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
})


const app = express();
app.use(bodyParser.json());

app.post('/api/test',jsonParser, (req,res) => {
    console.log(req.body);
    let sql = 'SELECT first_name,last_name,height,location,dating_status,blurb,picture,id,height,DATEDIFF(CURDATE(),dob) as age FROM singles WHERE gender =?';
    db.query(sql,[req.body.name], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});


const port = 5000;
app.listen(port, () => console.log(`server on port ${port}`));