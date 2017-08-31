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

