 //submit username/password
  var submit=document.getElementById('submit_btn');
  submit.onclick=function(){
      //create a request object
                  var request=new XMLHttpRequest();
                  request.onreadystatechange=function()
                  {
                          if(request.readyState===XMLHttpRequest.DONE)
                          {
                                  //Take some action
                                  if(request.status===200)
                                  {
                                     
                                      console.log('user logged in succefully');
                                      alert('Logged in successfully');
                                      
                                  }
                                  else if(request.status===403)
                                  {
                                      alert('Invalid username or password');
                                  }
                                  else if(request.status===500)
                                  {
                                      alert('something went wrong on the server');
                                  }
                          }
                          //request is not done yet
                      
                  };
                  
                  //Make a request to server and send the name
                  var username=document.getElementById('username').value;
                  var password=document.getElementById('password').value;
                  console.log(username);
                  console.log(password);
                  request.setRequestHeader('Content-Type','application/json');
                  request.open('POST','http://thotasrinagamounika.imad.hasura-app.io/login',true);
                  request.send(JSON.stringify({username: username,password: password})); 
      
        };
        