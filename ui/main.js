
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
  //capture name
  var nameInput=document.getElementById('name');
  var name=nameInput.value;
  var submit=document.getElementById('submit_btn');
  
  submit.onclick=function(){
      
      //Make a request to server and send the name
      
    //capture a list of names and render it as a list on the page
      var names=['Name1','Name2','Name3','Name4'];
      var list='';
      for(var i=0;i<names.length;i++)
      {
          list +='<li>'+names[i]+'</li>'; 
      }
      var ul=document.getElementById('namelist');
      ul.innerHTML=list;
      
  };