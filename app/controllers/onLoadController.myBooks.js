'use strict';

function getMyBooks(){
    return new Promise(function(resolve, reject){
        console.log("hi");
        ajaxFunctions.ajaxRequest('GET', appUrl + '/myBooks', function(data){
            resolve(JSON.parse(data));
        });
    });
}


(function(){
    
    ajaxFunctions.ready(function(){
        
        document.getElementById('my-requests').addEventListener('click', function(){
            getMyBooks().then(function(data){
                console.log("hi");
               console.log(data); 
            });
        });
       
    });
    
})();