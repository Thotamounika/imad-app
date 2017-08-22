var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
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
            <link rel="icon" href="/ui/iMac.gif" type="image/gif" sizes="16x16">
            
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
            </div>
        </body>
    </html>`;
return htmlTemplate;
}
var counter=0;
app.get('/counter', function(req, res){
   counter = counter + 1;
   res.send(counter.toString())
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

app.get('/:articleName', function (req, res){
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
