'use strict';

(function(){
    
    var bookList = document.querySelector('.book-list');
    
    ajaxFunctions.ready(function(){
       
        var allBooksPromise = new Promise(function(resolve, reject){
        
            ajaxFunctions.ajaxRequest('GET', appUrl + '/allBooks', function(data){
       //       console.log(data);
              resolve(JSON.parse(data));
            });
        });
        
        allBooksPromise.then(function(data){
            data.forEach(function(book){
                if(book.status.code !== 'traded'){
                    var div = document.createElement('div');
                    div.setAttribute('class', 'book-item');
                    if(book.status.code === 'available'){
                        div.innerHTML = '<button class="btn-link"><i class="fa fa-retweet trade" aria-hidden="true" style="font-size:25px;" id=\"' + book._id + '\"></i></button><img src=\"' + book.cover + '\">';
                    }
                    else if(book.status.code === 'requested'){
                         div.innerHTML = '<span>Requested</span><img src=\"' + book.cover + '\">';
                    }
                    bookList.append(div);
                }
            });
        }).then(function(){
            document.querySelectorAll('.trade').forEach(btn => btn.addEventListener('click', function(e){
                console.log(appUrl + '/trade?' + 'id=' + e.target.id);
                ajaxFunctions.ajaxRequest('GET', appUrl + '/trade?' + 'id=' + e.target.id, function(msg){
                    console.log(msg);
                });
            }));
        });
       
       document.querySelector(".home").addEventListener('click', function(){
           window.location.href = appUrl;
       }) ;
    });
    
})();