

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
        