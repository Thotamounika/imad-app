
//counter code
var button=document.getElementById('button');
button.onclick=function(){
  //create a request object
  var request=new XMLHttpRequest();
  
  
  request.onreadystatechange=function()
  {
      if(request.readystate===XMLHttpRequest.DONE)
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