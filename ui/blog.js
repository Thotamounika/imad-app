//loading comments
var postbtn=document.getElementById('post_btn');
postbtn.onclick=function(){
    //capture the comment
    var comment=document.getElementById('comment');
    var cmt=comment.value;
    
    //render it in the correct HTML
    //create a request object
    
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //is it successful
            if(request.status===200){
                //take some action
                //capture a list of comments and render it into a list of comments on the page
                var comments=request.responseText;
                comments=JSON.parse(comments);
                var list='';
                for(var i=0;i<comments.length;i++){
                    list+='<li>'+comments[i]+'</li>';
                }
                    var ul=document.getElementById('cmt_list');
                    ul.innerHTML=list;
                
            }
        }
        //request is not done yet
    };
    //Make a request to server and send comment
    
    request.open('GET','http://thotasrinagamounika.imad.hasura-app.io/comments?comment='+cmt,true);
    request.send(null);
    
};

/*
//counter code
var button=document.getElementById('counter');

button.onclick=function(){
                  //create a request object
                  var request=new XMLHttpRequest();
                  
                  
                  request.onreadystatechange=function()
                  {
                          if(request.readyState===XMLHttpRequest.DONE)
                          {
                                  //Take some action
                                  if(request.status===200)
                                  {
                                     
                                      //capture the response and store it in a variable
                                      var counter=request.responseText;
                                      
                                      //render the variable in the correct span
                                      var span=document.getElementById('count');
                                      span.innerHTML=counter.toString();
                                      
                                      
                                  }
                              
                          }
                          //request is not done yet
                      
                  };
                  
                  //Make the request
                  
                  request.open('GET','http://thotasrinagamounika.imad.hasura-app.io/counter',true);
                  request.send(null); 
  
  };
*/




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




/*var names=[];
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



app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

*/

