
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
  
  
  //submit name
  var submit=document.getElementById('submit_btn');
  
  submit.onclick=function(){
      //capture name
      var nameInput=document.getElementById('name');
      var name=nameInput.value;
      
      //create a request object
                  var request=new XMLHttpRequest();
                  
                  
                  request.onreadystatechange=function()
                  {
                          if(request.readyState===XMLHttpRequest.DONE)
                          {
                                  //Take some action
                                  if(request.status===200)
                                  {
                                     
                                      //capture a list of names and render it as a list on the page
                                      var names=request.responseText;
                                      names=JSON.parse(names);
                                      var list='';
                                      for(var i=0;i<names.length;i++)
                                      {
                                          list +='<li>'+names[i]+'</li>'; 
                                      }
                                      var ul=document.getElementById('namelist');
                                      ul.innerHTML=list;
                                      
                                      
                                  }
                              
                          }
                          //request is not done yet
                      
                  };
                  
                  //Make a request to server and send the name
                  
                  request.open('GET','http://thotasrinagamounika.imad.hasura-app.io/submit-name?name='+name,true);
                  request.send(null); 
      
        };
        

/*
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
*/
        