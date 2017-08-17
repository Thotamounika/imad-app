console.log('Loaded!');
//change the text of main-text div
var element=document.getElementById('main-text');

element.innerHTML='New Value';

//move dragon to right on click on it
var img=document.getElementById('dragon');
img.onclick= function(){
  img.style.marginLeft='100px';  
};