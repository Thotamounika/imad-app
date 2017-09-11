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

var articles={
        'article-one':{
            title:'Article-one | Thota Mounika',
            heading:'Article-one',
            date:'Aug 18,2017',
            content:`<p>
                        This is my first article.It is about time management.Many of us don't know how to utilize time efficiently.whenever we listen to an inspirational speech about the importance of time,we would feel sincere to implement time properly and we would plan a busy tight schedule of a type that one may not be able to take a breath in.we may implement it hardly a day or two.
                    </p>
                            
                    <p>
                       And then the story comes to the start,we would forget about the schedule we planned and days go plainly same as before.The problem is not in implementing our schedule correctly but in designing it.
                    </p>
                    <p>
                    Every day should be different in our life so our brain feels refreshed.we may feel stressed out and bored if our daily routine is same.It asks for a break ,give it a break.Then it boosts up your energy and makes us to understand things much faster without any stress.
                    </p>
                    <p>
                        so, finally follow what mind and soul says to you do.
                    </p>
            `
        },
        'article-two':{
            title:'Article-Two | Thota Mounika',
            heading:'Article-Two',
            date:'Aug 19,2017',
            content:`<p>
                                Hai this is my second article.<br/>
                                I'll be honest, I still don't "enjoy" mornings - I mean, waking up is hard to do. But the truth is, the benefits of waking up early have turned me into a believer.<br/>
                                If you're not convinced, here are my top reasons why waking up early is good for you.
                                </p>
                                
                               
                                    <ol>
                                        <li>Waking Up Early Correlates With Better Grades</li>
                                        <li>Waking Up Early Helps You To Sustain a Healthier Diet</li>
                                        <li>Waking Up Early Enhances Your Productivity</li>
                                        <li>Waking Up Early Gives You a Better Mental Health</li>
                                        <li> Waking Up Early Gives You More Time To Exercise</li>
                                    </ol> `
            
        },
        'article-three':{
            title:'Article-Three | Thota Mounika',
            heading:'Article-Three',
            date:'Aug 20, 2017',
            content:`<p>
                        Procrastination means to postpone doing something, especially as a regular practice. It is also to delay something that one should do and it is not done because one does not want to do it. There are habits that do not do any good to people but harm, procrastination is one among them.
                        </p>
                        <p>
                        As it's said commonly that things have their own merits and demerits or pros and cons, but in case of procrastination there can be no advantages except disadvantages because the implied meaning of procrastination is delaying doing something that should be done on time.
                        </p>
                        <p>
                        What advantage can one gain if he postpones doing necessary things? Conversely, the things that are supposed to be done must be done on time, so that the desired results may be attained accordingly.
                        </p> `
        }
};

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
           var error=err.toString();
           res.setHeader('Content-Type', 'application/json');
            res.status(500).send(JSON.parse('{"error":"Another user created"}'));
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.parse(`{"message":"user ${username} is created successfully"}`));
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
                    res.status(403).send(JSON.parse('{"error":"Username or Password is incorrect"}'));
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
                        res.send(JSON.parse(`{"message":"${username} credentials are correct"}`));
                        
                    }
                    
                    else{
                        res.setHeader('Content-Type', 'application/json');
                        res.status(403).send(JSON.parse('{"error":"Username or Password is incorrect"}'));
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

var names=[];
app.get('/submit-name',function(req, res){
   var name=req.query.name;//extract the name from request
   names.push(name);//concatenate name to our overall list of names
   //return the response that is array of names by converting array into string using JSON Javascript Object Notation.
   res.send(JSON.stringify(names));
   
});

var comments=[];
app.get('/comments',function(req,res){
    var comment=req.query.comment;// the url would be /comments?comment=Nice post!!!
    comments.push(comment); // concatenate comment to our overall list of comments
    //return the response that is array of comments by converting comments array into string using JSON .
    res.send(JSON.stringify(comments));
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

app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
