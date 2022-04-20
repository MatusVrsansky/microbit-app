const express =  require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// send email
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'microbitpython@gmail.com',
        pass: 'mbwnqmmpwgopnoga',
    }
});

var message = "<p style='font-weight:bold;'> Hi. My name is John </p>";

// test variables for temperature, wind ...
//html:"<p>Your message "+variable1+".Message continueous "+variable+"</p>"


var temperature = 23.25;
var wind = 45.5668;

const mailOptions = {
    from: 'microbitpython@gmail.com',
    to: 'vrsansky.matus@gmail.com',
    subject: 'Sent from Node.js',
    text: "Plaintext version of the message",
    html: "<h4>Microbit prediction</h4><p><strong>temeprature: </strong>" + temperature + "</p>" + "<p><strong>wind: </strong>" + wind + "</p>"
};



transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: '+ info.response);
    }
});



// database connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'simpledb',
    port: 3306
});

// check database connection
db.connect(err=>{
    if (err) {
        console.log(err, 'DB error');
    }
    console.log('Database connected...');
})

// get all data
app.get('/user', (req, res)=> {

    let query = `select * from user`;

    db.query(query, (err, result) => {
        if(err) {
            console.log(err, 'Error');
        }

        if(result.length > 0) {
            res.send({
                message: 'all user data',
                data:result
            });
        }
    });
});


app.listen(3000, () => {
    console.log('server running Matus...');
})


// get single data
app.get('/user/:id', (req, res)=> {
    console.log(req.params.id,'getid==>')
});

// create data
app.post('/user', (req, res)=> {
    console.log(req.body, 'createdata');
    
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mb = req.body.mobile;


    let query = `insert into user(fullname, email, mobile)
                    values('${fullname}','${email}','${mb}')`;

    db.query(query, (err,result)=> {

        if(err){console.log(err);}
        console.log(result, 'result')
        res.send({
            message: 'data inserted',
        });
    })                
});

// update single data
app.put('/user/:id', (req, res)=> {

    console.log(req.body, 'update data');

    let gID = req.params.id;
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;

    let query = `update user set fullname = '${fullname}', email = '${email}', mobile = '${mobile}'
                    where id = ${gID}`;

    db.query(query, (err, result)=> {

        if(err) {console.log(err);}

        res.send({
            message: 'data updated'
        });
    });
});

// delete single data

app.delete('/user/:id', (req, res)=> {

    let gID = req.params.id;

    let query = `delete from user where id = '${gID}' `;
    db.query(query, (err, result)=>{
        if(err) {console.log(err);}

        res.send(
            {
                message: 'data deleted'
            }
        )
    });


});



