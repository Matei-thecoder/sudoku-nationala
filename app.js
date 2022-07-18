
//initial values
const express = require('express');
const bodyParser = require('body-parser');
const app =express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const { receiveMessageOnPort } = require('worker_threads');


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
                res.cookie("profil-image",results[0].profilimage);
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
                inhuman:'0',
                profilimage:'icon'
                
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
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './images/')     // './images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 
app.post('/api/addImage/:id', upload.single('image'),(req,res)=>{
    if(!req.file)
    {
        console.log("nothing to upload...");
    }
    else
    {
        const id = req.params.id;
        //const image = req.body.image;
        console.log(req.file.filename);
        console.log("called add image...");
        let imgsrc = '/images/'+req.file.filename;
        let sqlOuery = `UPDATE players SET profilimage= '${imgsrc}' WHERE Id=${id}`;
        conn.query(sqlOuery,(err,results)=>{
            if(err) throw err;
            console.log("iMage uploaded")
            let sqlQuery2 = ` SELECT * FROM players WHERE Id=${id}`;
            conn.query(sqlQuery2,(err,results2)=>{
                if(err) throw err;
                res.cookie("profil-image",results2[0].profilimage);
                res.redirect('/profil.html');
            })
        })
    }
    
});
app.post('/api/updatename/:id', (req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    let sqlOuery = `UPDATE players SET nume='${name}' WHERE Id=${id}`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log("name updated...");
        let sqlQuery2 = ` SELECT * FROM players WHERE Id=${id}`;
        conn.query(sqlQuery2,(err,results2)=>{
            if(err) throw err;
            console.log("cookie name created...");
            res.cookie("name",results2[0].nume);
            res.redirect("/profil.html");
        })
    })
})

app.post('/api/removeImage/:id', (req,res) =>{
    const id = req.params.id;
    let sqlQuery = `UPDATE players SET profilimage='icon' WHERE Id=${id}`;
    conn.query(sqlQuery,(err,results) =>{
        if(err) throw err;
        console.log("Image deleted...");
        res.cookie('profil-image', 'icon');
        res.redirect('/profil.html');
    })
});
app.post('/api/search/:id',(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    let sqlOuery= `SELECT * FROM players WHERE nume='${name}'`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log("searched...");
        res.cookie(`results-lenght`,results.length);
        let sqlOuery2 = `SELECT * FROM relation`;
        conn.query(sqlOuery2,(err,results2)=>{
            if(err) throw err;
            console.log('Searching in relation...');
            for(let i=0; i<results.length; i++)
            {
                res.cookie(`${i}_id`,results[i].Id);
                res.cookie(`${i}_profil-picture`, results[i].profilimage);
                res.cookie(`${i}_name`,results[i].nume);
                res.cookie(`${i}_status`,'button');
            }
            for(let i = 0; i<results.length ; i++)
            {
                for(let j=0; j<results2.length ; j++)
                {
                    if( (results[i].Id == results2[j].first && id ==results2[j].second) || (results[i].Id == results2[j].second && id == results2[j].first))
                    {
                        res.cookie(`${i}_status`,'no');
                    }
                }
            }
            
            res.redirect("/search.html");

        })
        
    });
});

app.post('/api/delete/search/cookies/:len',(req,res)=>{
    const len = req.params.len;
    for(let i=0;i<len;i++)
    {
        res.clearCookie(`${i}_id`);
        res.clearCookie(`${i}_profil-picture`);
        res.clearCookie(`${i}_name`);
    }
    res.clearCookie('results-lenght');
    console.log("search cookies deleted...")
    res.redirect('/game.html');
    
});

app.post('/api/delete/received/cookies/:len',(req,res)=>{
    const len = req.params.len;
    for(let i=0;i<len;i++)
    {
        res.clearCookie(`${i}_id`);
        res.clearCookie(`${i}_profil-picture`);
        res.clearCookie(`${i}_name`);
        
    }
    res.clearCookie('results-lenght');
    console.log("send cookies deleted...")
    res.redirect('/profil.html');
})

app.post('/api/delete/send/cookies/:len',(req,res)=>{
    const len = req.params.len;
    for(let i=0;i<len;i++)
    {
        res.clearCookie(`${i}_id`);
        res.clearCookie(`${i}_profil-picture`);
        res.clearCookie(`${i}_name`);
        res.clearCookie(`${i}_status`);
    }
    res.clearCookie('results-lenght');
    console.log("send cookies deleted...")
    res.redirect('/profil.html');
    
});

app.post('/api/addFriend/:userid/:friendid/:i',(req,res)=>{
    const userid = req.params.userid;
    const friendid = req.params.friendid;
    const i =req.params.i;
    let sqlOuery = `SELECT * FROM relation WHERE first=${userid} AND second=${friendid}`;
    conn.query(sqlOuery,(err,results)=>
    {
        if (err) throw err;
        console.log("Called Add Friend...");
        if(results.length ===0)
        {
            let sqlOuery2 = `SELECT * FROM relation WHERE first=${friendid} AND second=${userid}`;
            conn.query(sqlOuery2,(err,results2)=>{
                if(err) throw err;
                if(results2.length === 0)
                {
                    let sqlQuery3 = `INSERT INTO relation (first,second,status) VALUES (${userid},${friendid},'wait')`;
                    conn.query(sqlQuery3,(err,results3)=>{
                        if(err) throw err;
                        res.cookie(`${i}_status`,'no');
                        res.send(`<script>alert("Ai trimis o cerere de prietenie utilizatorului cu id-ul ${friendid}. Verifica rubrica SEND."); 
                        window.location.replace("/search.html");</script>`);
                    })
                }
                else
                {
                    res.send(`<script>alert("Ai primit o cerere in prietenie de la acest utilizator sau esti deja prieten cu el. Verifica rubricile RECEIVED si FRIENDS"); 
            window.location.replace("/search.html")</script>`);
                }
                
            })
            
            
        }
        else
        {
            res.send(`<script>alert("Deja ai trimis o cerere de prietenie acestui utilizator sau sunteti deja prieten cu el. Va recomand sa verificati rubricile SEND si FRIENDS."); 
            window.location.replace("/search.html")</script>`);
        }
    })
})

app.post('/api/send/:id',(req,res)=>{
    const id = req.params.id;
    const array = ['wait','rejected'];
    let sqlOuery = `SELECT * FROM relation WHERE first=${id} AND status IN (?)`;
    conn.query(sqlOuery,[array],(err,results)=>{
        if(err) throw err;
        console.log("Called send...");
        if(results.length===0)
        {
            res.send(`<script>alert("Nu ai trimis nicio cerere de prietenie. Pentru a face acest lucru, consulta instructiunile."); 
            window.location.replace("/send.html");</script>`);
        }
        else
        {
            const friendIdArray = [];
            for(let i=0; i<results.length; i++)
            {
                res.cookie(`${i}_status`,results[i].status);
                friendIdArray[i] = results[i].second;
            }
            let sqlOuery2 = `SELECT * FROM players WHERE Id IN (?)`;
            conn.query(sqlOuery2,[friendIdArray],(err,results2)=>{
                if(err) throw err;
                console.log("Creating Cookies...");
                res.cookie(`results-lenght`,results2.length);
                for(let i=0; i<results2.length; i++)
                {
                    res.cookie(`${i}_id`,results2[i].Id);
                    res.cookie(`${i}_profilimage`,results2[i].profilimage);
                    res.cookie(`${i}_name`,results2[i].nume);

                }
                res.redirect("/send.html");
            })
        }
    })
})

app.post('/api/receive/:id',(req,res)=>{
    const id= req.params.id;
    let sqlOuery = `SELECT * FROM relation WHERE second=${id} AND status='wait'`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log('Called received post ...');
        if(results.length === 0)
        {
            res.send(`<script>alert("Nu ai primit nicio cerere de prietenie."); 
            window.location.replace("/received.html");</script>`);
        }
        else
        {
            const friendIdArray = [];
            for(let i=0; i<results.length; i++)
            {
                
                friendIdArray[i] = results[i].first;
            }
            let sqlOuery2 = `SELECT * FROM players WHERE Id IN (?)`;
            conn.query(sqlOuery2,[friendIdArray],(err,results2)=>{
                if(err) throw err;
                console.log("Creating Cookies...");
                res.cookie(`results-lenght`,results2.length);
                for(let i=0; i<results2.length; i++)
                {
                    res.cookie(`${i}_id`,results2[i].Id);
                    res.cookie(`${i}_profilimage`,results2[i].profilimage);
                    res.cookie(`${i}_name`,results2[i].nume);

                }
                res.redirect("/received.html");
            })
        }

    })
})

app.post('/api/acceptFriendRequest/:userid/:friendid/:i/:len',(req,res)=>{
    const userid = req.params.userid;
    const friendid = req.params.friendid;
    const i =req.params.i;
    let len = req.params.len;
    let sqlOuery = `UPDATE relation SET status='friends' WHERE second=${userid} AND first=${friendid} `;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log('friend added...');
        res.clearCookie(`${i}_id`);
        res.clearCookie(`${i}_profilimage`);
        res.clearCookie(`${i}_name`);
        len--;
        res.cookie('results-lenght',len);
        res.redirect('/received.html');
    })
})

app.post('/api/rejectFriendRequest/:userid/:friendid/:i/:len',(req,res)=>{
    const userid = req.params.userid;
    const friendid = req.params.friendid;
    const i = req.params.i;
    let len = req.params.len;
    let sqlOuery = `UPDATE relation SET status='rejected' WHERE second=${userid} AND first=${friendid}`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log("Friend request rejected...");
        res.clearCookie(`${i}_id`);
        res.clearCookie(`${i}_profilimage`);
        res.clearCookie(`${i}_name`);
        len--;
        res.cookie('results-lenght',len);
        res.redirect('/received.html');
    })
});

app.post('/api/deleteRequest/:userid/:friendid/:i/:len',(req,res)=>{
    const userid = req.params.userid;
    const friendid = req.params.friendid;
    const i = req.params.i;
    let len = req.params.len;
    let sqlOuery = `DELETE FROM relation WHERE first=${userid} AND second=${friendid}`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log("Request DELETED...");
        res.clearCookie(`${i}_id`);
        res.clearCookie(`${i}_profilimage`);
        res.clearCookie(`${i}_name`);
        len--;
        res.cookie('results-lenght',len);
        res.redirect('/send.html');
    })
});
app.post('/api/friends/:id',(req,res)=>{
    const id = req.params.id;
    let sqlOuery = `SELECT * FROM relation WHERE status='friends' AND (first=${id} OR second=${id})`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log('Creating friends cookies...');
        if(results.length === 0)
        {
            res.send(`<script>alert("Nu ai niciun prieten."); 
            window.location.replace("/friends.html");</script>`);
           
        }
        else
        {
            const friendIdArray = [];
            for(let i=0; i<results.length; i++)
            {
                if(results[i].first != id){
                    friendIdArray[i] = results[i].first;
                }
                else if(results[i].second != id)
                {
                    friendIdArray[i] = results[i].second;
                }
                    
            }
            let sqlOuery2 = `SELECT * FROM players WHERE Id IN (?)`;
            conn.query(sqlOuery2,[friendIdArray],(err,results2)=>{
                if(err) throw err;
                console.log("Creating Cookies...");
                res.cookie(`results-lenght`,results2.length);
                for(let i=0; i<results2.length; i++)
                {
                    res.cookie(`${i}_id`,results2[i].Id);
                    res.cookie(`${i}_profilimage`,results2[i].profilimage);
                    res.cookie(`${i}_name`,results2[i].nume);

                }
                res.redirect("/friends.html");
            })
        }

    })

});

app.post('/api/compare/:friendid',(req,res)=>{
    const friendid = req.params.friendid;
    let sqlOuery = `SELECT * FROM players WHERE Id=${friendid}`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log("Creating cookies about friend...");
        if(results.length ===0)
            res.send('a intervenit o eroare...');
        else
        {
            res.cookie('friend_id',results[0].Id);
            res.cookie('friend_name',results[0].nume);
            res.cookie('friend_profilimage',results[0].profilimage);
            res.cookie('friend_easy',results[0].easy);
            res.cookie('friend_medium',results[0].medium);
            res.cookie('friend_hard',results[0].hard);
            res.cookie('friend_veryhard',results[0].veryhard);
            res.cookie('friend_insane',results[0].insane);
            res.cookie('friend_inhuman',results[0].inhuman);
            res.redirect('/compare.html');
        }
    })
})

app.post('/api/delete/friend/cookies',(req,res)=>{
    res.clearCookie('friend_name');
    res.clearCookie('friend_id');
    res.clearCookie('friend_easy');
    res.clearCookie('friend_medium');
    res.clearCookie('friend_hard');
    res.clearCookie('friend_veryhard');
    res.clearCookie('friend_insane');
    res.clearCookie('friend_inhuman');
    res.clearCookie('friend_profilimage');
    res.redirect('/friends.html')
});

app.post('/api/change/password/:id',(req,res) =>{
    const id = req.params.id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    let sqlOuery = `SELECT * FROM players WHERE Id=${id}`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        let password_hash = results[0].password;
        let verified = bcrypt.compareSync(oldpassword,password_hash);
        if(verified)
        {
            let new_password_hash = bcrypt.hashSync(newpassword,10);
            let sqlOuery2 = `UPDATE players SET password = ?  WHERE Id=${id}`;
            conn.query(sqlOuery2,new_password_hash,(err,results2)=>{
                if(err) throw err;
                res.send("<script> alert('Parola actualizata cu succes.'); window.location.replace('/changepassword.html');</script>")
            })
        }
        else
        {
            res.send("<script> alert(`Parola veche gresita`); window.location.replace(`/changepassword.html`);</script>")
        }
    })
});

app.post('/api/received/messages/:id',(req,res)=>{
    const id= req.params.id;
    let sqlOuery = `SELECT * FROM messages WHERE second=${id}`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log("RECEIVED Messages Cookies created...");
        console.log(id);
        console.log(results.length);
        if(results.length === 0)
        {
            res.cookie('receivedmessages','nomessages');
            res.redirect("/receivedMessages.html");
        }
        else
        {
            res.cookie('results-length',results.length);
            const people_who_send_messages_id = [];
            for(let i=0; i< results.length; i++)
            {
                people_who_send_messages_id[i] = results[i].first;
                res.cookie(`${i}_received_message`,results[i].message);
                res.cookie(`${i}_received_subiect`,results[i].subiect);
                res.cookie(`${i}_received_status`,results[i].status);
                res.cookie(`${i}_received_messageid`,results[i].messageid);
            }
            let sqlOuery2 = `SELECT * FROM players WHERE Id IN (?)`;
            conn.query(sqlOuery2,[people_who_send_messages_id],(err,results2)=>{
                if(err) throw err;
                const array = []
                for(let i=0; i<results.length; i++)
                {
                    for(let j=0; j<results2.length; j++)
                    {
                        if(results[i].first == results2[j].Id)
                        {
                            res.cookie(`${i}_received_id`,results2[j].Id);
                            res.cookie(`${i}_received_profilimage`,results2[j].profilimage);
                            res.cookie(`${i}_received_name`,results2[j].nume);
                            array[i] = results2[j].Id;
                        }
                    }
                }
               
                console.log(array);
                console.log(results2);
                res.cookie('receivedmessages','yes');
                res.redirect("/receivedMessages.html");

            })
        }
    })
})

app.post('/api/view/received/message/:i/:friendid/:messageid/:userid',(req,res)=>{
    const i = req.params.i;
    const friendid = req.params.friendid;
    const userid = req.params.userid;
    const messageid  = req.params.messageid;
    res.cookie(`${i}_received_status`,'read');
    
    let sqlOuery = ` UPDATE messages SET status='read' WHERE first=${friendid} AND second=${userid} AND messageid=${messageid}`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log('ndfsdknfg');
        let sqlOuery2 = `SELECT * FROM players WHERE Id=${friendid}`;
        console.log(results);
        conn.query(sqlOuery2,(err,results2)=>{
            if(err) throw err;
            res.cookie('friendid',results2[0].Id);
            res.cookie('friendname',results2[0].nume);
            res.cookie('friendprofilimage',results2[0].profilimage);
            console.log(results2);
            console.log(messageid);
            let sqlQuery3 = `SELECT * FROM messages WHERE first=${friendid} AND (second=${userid} AND messageid=${messageid})`;
            conn.query(sqlQuery3,(err,results3)=>{
                if(err)throw err;
                console.log(results3);
                res.cookie('friendsubiect',results3[0].subiect);
                res.cookie('friendmessage',results3[0].message);
                res.redirect("/message.html");
            })
        })
    })

    
})

app.post('/api/send/messages/:id',(req,res)=>{
    const id= req.params.id;
    let sqlOuery = `SELECT * FROM messages WHERE first=${id}`;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        console.log("SEND Messages Cookies created...");
        if(results.length === 0)
        {
            res.cookie('sendmessages','nomessages');
            res.redirect("/sendMessages.html");
        }
        else
        {
            res.cookie('results-length',results.length);
            const people_who_received_messages_id = [];
            const array = [];
            for(let i=0; i< results.length; i++)
            {
                people_who_received_messages_id[i] = results[i].second;
                res.cookie(`${i}_send_message`,results[i].message);
                res.cookie(`${i}_send_subiect`,results[i].subiect);
                res.cookie(`${i}_send_status`,results[i].status);
                res.cookie(`${i}_send_messageid`,results[i].messageid);
            }
            console.log([people_who_received_messages_id])
            
            let sqlOuery2 = `SELECT * FROM players WHERE Id IN (?)`;
            conn.query(sqlOuery2,[people_who_received_messages_id],(err,results2)=>{
                if(err) throw err;
                for(let i =0; i<results.length; i++)
                {
                    for(let j=0; j<results2.length; j++)
                    {
                        if(results[i].second == results2[j].Id)
                        {
                            res.cookie(`${i}_send_id`,results2[j].Id);
                            res.cookie(`${i}_send_profilimage`,results2[j].profilimage);
                            res.cookie(`${i}_send_name`,results2[j].nume);
                            array[i] = results2[j].Id;
                        }
                    }
                }
                
                console.log([array]);
                res.cookie('sendmessages','yes');
                res.redirect("/sendMessages.html");

            })
        }
    })
})

app.post('/api/view/send/message/:i/:friendid/:messageid/:userid',(req,res)=>{
    const i = req.params.i;
    const friendid = req.params.friendid;
    const userid = req.params.userid;
    const messageid  = req.params.messageid;
    console.log('ndfsdknfg');
    let sqlOuery2 = `SELECT * FROM players WHERE Id=${friendid}`;
    
    conn.query(sqlOuery2,(err,results2)=>{
        if(err) throw err;
        res.cookie('friendid',results2[0].Id);
        res.cookie('friendname',results2[0].nume);
        res.cookie('friendprofilimage',results2[0].profilimage);
        console.log(results2);
        console.log(messageid);
        let sqlQuery3 = `SELECT * FROM messages WHERE second=${friendid} AND (first=${userid} AND messageid=${messageid})`;
        conn.query(sqlQuery3,(err,results3)=>{
            if(err)throw err;
            console.log(results3);
            res.cookie('friendsubiect',results3[0].subiect);
            res.cookie('friendmessage',results3[0].message);
            res.redirect("/message.html");
        })
    })
    

    
})

app.post('/api/send/mail/:id',(req,res)=>{
    const userid = req.params.id;
    const friendid = req.body.id;
    const subiect = req.body.subiect;
    const message = req.body.message;
    let sqlOuery = ` INSERT INTO messages (first,second,message,status,subiect) VALUES (${userid},${friendid},"${message}","unread","${subiect}") `;
    conn.query(sqlOuery,(err,results)=>{
        if(err) throw err;
        res.send("<script>alert('Mesaj trimis') ; window.location.href='/mail.html'</script>");
    })
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
    res.clearCookie('profil-image');
    res.send(`<script>alert("Te-ai delogat!"); window.location.replace("/signup.html"); </script>`);
    
})

//app listens to port 3001
app.listen(3001,()=>{
    console.log('Server started on port 3001...');
});