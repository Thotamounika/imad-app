console.log('Loaded!');
//change the text of main-text div
/*var element=document.getElementById('main-text');

element.innerHTML='New Value';

//move dragon to right on click on it
var img=document.getElementById('dragon');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+1;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick= function(){
  var interval=setInterval(moveRight,100) 
};*/

//counter code
var counter=0;
var button=document.getElementById('button');
button.onclick=function(){
  //Make a request to the counter endpoint
  
  //capture the response and store it in a variable
  counter=counter+1;
  //render the variable in the correct span
  var span=document.getElementById('count');
  span.innerHTML=counter.toString();
  
  
};