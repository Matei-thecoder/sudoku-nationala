
//initial values
const express = require('express');
const bodyParser = require('body-parser');
const app =express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');


//usage
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/"));
app.use(cookieParser());

//connection to myzql database 
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database:'sudoku'
});

conn.connect( (err) =>{
    if(err) throw err;
    console.log('Mysql Connected with App...');
});

//secure
app.get("/game.html", (req, res) => {
    let { email, password } = req.cookies;
    try {
        email = email.replace("%40", '@');
        let sqlQuery = `SELECT * FROM players WHERE email='${email}' AND password='${password}'`;

        conn.query(sqlQuery, (err, results) => {
            if(err) throw err;

            if(results.length === 1) {
                res.redirect("/game.html");
            } else {
                throw 0;
            }
        });
    } catch {
        res.send("nu esti logat");
    }
    
     
});



app.get('/api/players',(req, res) => {
    console.log("CAlled...");
    let sqlQuery = "SELECT * FROM players";
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
      
    });
  });
//login
app.post('/api/login',(req,res) =>{
    console.log("called login...");
    const email = req.body.email;
    const password = req.body.password;
    let sqlQuery = `SELECT * FROM players WHERE email='${email}'`;

   // console.log(sqlQuery)

    conn.query(sqlQuery, (err, results) => {
        if(err) throw err;
        
        if(results.length === 1) {
            var password_hash = results[0].password;
            const verified = bcrypt.compareSync(password,password_hash);

            if(verified)
            {
                console.log(results);
                res.cookie("email", email);
                res.cookie("id",results[0].Id);
                
                res.cookie("name", results[0].nume);
                res.cookie("easy", results[0].easy);
                res.cookie("medium",results[0].medium);
                res.cookie("hard",results[0].hard);
                res.cookie("veryhard",results[0].veryhard)
                res.cookie("insane",results[0].insane);
                res.cookie("inhuman",results[0].inhuman);
                res.redirect("/game.html");
            }
            else
            {
                res.send(`<script>alert("Email sau parola gresita!"); window.location.replace("/login.html"); </script>`);

            }
            
        }
        else
        {
            res.send(`<script>alert("Email sau parola gresita!"); window.location.replace("/login.html"); </script>`);
        }
    //int(255)
        
       
    })
});
//sign up
app.post('/api/signup',(req,res)=>{
    console.log("Check called...");
    let email = req.body.email;
    let sqlQuery = `SELECT * FROM players WHERE email='${email}'`;
    conn.query(sqlQuery,(err,results) =>{
        if(err) throw err;
        if(results.length===1)
        {
            
           
            res.send(`<script>alert("Exista deja un utilizator"); window.location.replace("/signup.html"); </script>`);
        }
        else
        {
            console.log("Called post..");
            console.log(req.body);
            let password_hash = bcrypt.hashSync(req.body.password,10);
            let data = {
                nume: req.body.name,
                email: req.body.email,
                password: password_hash,
                easy:'0',
                medium:'0',
                hard:'0',
                veryhard:'0',
                insane:'0',
                inhuman:'0'
                
            };
            let sqlQuery = "INSERT INTO players SET ?";
            let query = conn.query(sqlQuery,data, (err,results)=>{
                if(err) throw err;
                // res.send(apiResponse(results));
                res.redirect("/login.html");
            });
        }
    });
});


//Update db
app.post('/api/update/:id/:easy/:medium/:hard/:veryhard/:insane/:inhuman',(req, res) => {
    const id = req.params.id;
    const easy = req.params.easy;
    const medium = req.params.medium;
    const hard = req.params.hard;
    const veryhard = req.params.veryhard;
    const insane = req.params.insane;
    const inhuman = req.params.inhuman;
    let sqlQuery = `UPDATE players SET easy=${easy}, medium=${medium}, hard=${hard}, veryhard=${veryhard}, insane=${insane}, inhuman=${inhuman}  WHERE Id=${id}`;
    
    conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      let sqlQuery2 = `SELECT * FROM players WHERE Id='${id}'`;
      console.log("called put...");
      conn.query(sqlQuery2,(err,results2)=>{
        if(err) throw err;
        if(results2.length === 1) {
            console.log(results);
            res.cookie("easy", results2[0].easy);
            res.cookie("medium",results2[0].medium);
            res.cookie("hard",results2[0].hard);
            res.cookie("veryhard",results2[0].veryhard)
            res.cookie("insane",results2[0].insane);
            res.cookie("inhuman",results2[0].inhuman);
            res.redirect("/game.html");
        }
       
            
        
      })
    });
  });






app.get('/api/player/',(req,res)=>{
    console.log(req.cookies);
    let cookie = getcookie(req);
    console.log(cookie);

    res.send(req.cookies);
})
function apiResponse (results) {
    return JSON.stringify({
        "status":200,
        "error" : null,
        "response":results
    });
}
app.get('/delete/cookies/',(req,res)=>{
    res.clearCookie('name');
    res.clearCookie('id');
    res.clearCookie('email');
    res.clearCookie('easy');
    res.clearCookie('medium');
    res.clearCookie('hard');
    res.clearCookie('veryhard');
    res.clearCookie('insane');
    res.clearCookie('inhuman');
    res.send(`<script>alert("Te-ai delogat!"); window.location.replace("/signup.html"); </script>`);
    
})
//app listens to port 3001
app.listen(3001,()=>{
    console.log('Server started on port 3001...');
});