var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne={
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
            </div>
        </body>
    </html>`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



app.get('/article-one', function (req, res){
  res.send(createTemplate(articleOne));
});
app.get('/article-two', function(req,res){
   res.sendFile(path.join(__dirname,'ui','article-two.html')); 
});
app.get('/article-three', function(req, res){
    res.sendFile(path.join(__dirname,'ui','article-three.html'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
