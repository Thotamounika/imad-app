var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config ={
    user:'thotasrinagamounika',
    database: 'thotasrinagamounika',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};



var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createTemplate(data)
{
var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;
var htmlTemplate=`
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
            
            
            
        </head>
        <body>
            <div class="container">
                
                
                <div>
                <a href='/'>Home</a><br/>
                </div>
                
                <hr/>
                
                <div>
                    <h2>${heading}</h2>
                </div>
                
                <div>
                    ${date}
                </div>
                
                <div>
                    
                   ${content} 
                </div>
                
                <div>
                    <b>comments:</b>
                    <hr>
                    <textarea id="comment" rows="4" cols="110" placeholder="Write your comments here..."></textarea><br/><br/>
                    <button id="post_btn">post</button>
                    <br>
                    <br>
                    <ul id="cmt_list">
                    
                    </ul>
                     <script type="text/javascript" src="/ui/blog.js">
        </script>
                </div>
        </body>
    </html>`;
return htmlTemplate;
}
var counter=0;
app.get('/counter', function(req, res){
   counter = counter + 1;
   res.send(counter.toString());
});


function hash(input, salt){
    //how do we create a hash
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512, 'sha512');
    return ["pbkdf2",10000,salt,hashed.toString('hex')].join('$');
}


app.get('/hash/:input',function(req,res){
   
   var hashedString=hash(req.params.input,'this-is-some-random-string');
   res.send(hashedString);
 
});

app.post('/create-user',function(req,res){
    
   //This function as an input will take username and password and it will create an entry in the user table
   //{"username":"mounika","password":"password"}
   var username=req.body.username;//This is a JSON request
   var password=req.body.password;
   var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username,dbString],function(err,result){
       
       if(err){
           
           res.setHeader('Content-Type', 'application/json');
            res.status(500).send(JSON.parse(`{"error":"Sorry username is taken"}`));
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.parse(`{"message":"user ${username} successfully created"}`));
        }
       
       
   });
});
   
   app.post('/login',function(req,res){
      
   var username=req.body.username;//This is a JSON request
   var password=req.body.password;
   pool.query('SELECT * from "user" WHERE username= $1',[username],function(err,result){
       
       if(err){
           res.setHeader('Content-Type', 'application/json');
            res.status(500).send(JSON.parse('{"error":{err.toString()}'));
        }
        else{
                    
                    if(result.rows.length===0){
                    res.setHeader('Content-Type', 'application/json');
                    res.status(403).send(JSON.parse('{"error":"Invalid Username or Password"}'));
                    }
                  else{
                    //username exists now match password
                    
                    //extract the password stored in the database
                    var dbString=result.rows[0].password;
                    var salt=dbString.split('$')[2];
                    var hashedPassword=hash(password,salt);//creating hash based on the password submitted and the original salt
                    if(dbString===hashedPassword){
                        //create a session
                        req.session.auth= {userId: result.rows[0].id};
                        //set cookie with a session id randomly generating
                        //internally on the server side it maps the session id to an object
                        //{auth: {userId}}
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.parse(`{"message":"${username} You have sucessfully logged in"}`));
                        
                    }
                    
                    else{
                        res.setHeader('Content-Type', 'application/json');
                        res.status(403).send(JSON.parse('{"error":"Invalid Username or Password"}'));
                    }
                    
                }
        }
       
   });
});

app.get('/check-login',function(req, res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send('You are logged in '+req.session.auth.userId.toString());
    }
    else{
        res.send('You are not logged in');
    }
    
});

app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send('Logged out');
});

var pool=new Pool(config);
app.get('/test-db', function(req, res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test',function(err, result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/articles/:articleName', function (req, res){ 
    
    //SELECT * FROM article WHERE title='\';DELETE FROM article WHERE \'a\'=\'a'
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.status(404).send('article not found!');
            }
            else{
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
  
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/blog.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','blog.js'));
});
app.get('/ui/iMac.gif', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'iMac.gif'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
