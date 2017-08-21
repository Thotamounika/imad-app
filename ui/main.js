
//counter code
var button=document.getElementById('counter');
var counter=0;
button.onclick=function(){
                  //create a request object
                  var request=new XMLHttpRequest();
                  
                  
                  request.onreadystatechange=function()
                  {
                          if(request.readystate==XMLHttpRequest.DONE)
                          {
                                  //Take some action
                                  if(request.status==200)
                                  {
                                      alert('hai');
                                      //capture the response and store it in a variable
                                      var counter=request.responseText;
                                      
                                      //render the variable in the correct span
                                      
                                  }
                              
                          }
                          //request is not done yet
                      
                  };
                  
                  //Make the request
                  
                  request.open('GET','http://thotasrinagamounika.imad.hasura-app.io/counter',true);
                  counter=counter+1;
                  var span=document.getElementById('count');
                                      span.innerHTML=counter.toString();
                  request.send(null);
  
  };