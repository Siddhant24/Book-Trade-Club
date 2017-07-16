'use strict';

var requestText = document.querySelector('.request-text');
var bookList = document.querySelector('.book-list');

function getMyBooks(){
    return new Promise(function(resolve, reject){
        ajaxFunctions.ajaxRequest('GET', appUrl + '/myBooks', function(data){
            resolve(JSON.parse(data));
        });
    });
}

function removeBook(e){
    ajaxFunctions.ajaxPostRequest({book_id: e.id}, appUrl + '/myBooks', function(msg){
        window.location.reload(true);
    });
}

function approveRequest(e){
    ajaxFunctions.ajaxPostRequest({book_id: e.id.slice(1)}, appUrl + '/request', function(msg){
        window.location.reload(true);
    });
}

function cancelRequest(e){
    ajaxFunctions.ajaxPostRequest({book_id: e.id.slice(1)}, appUrl + '/trade', function(msg){
        window.location.reload(true);
    });
}


(function(){
    
    ajaxFunctions.ready(function(){
        getMyBooks().then(function(data){
            return data;
        }).then(function(data){
            
            data.books.forEach(function(book){
                if(book.status.code !== 'traded'){
                    var div = document.createElement('div');
                    div.setAttribute('class', 'book-item');
                    div.innerHTML = '<button class="btn-link"><i class="fa fa-times remove" aria-hidden="true" onclick="removeBook(this)" style="font-size:25px;" id=\"' + book._id + '\"></i></button><img src=\"' + book.cover + '\">';
                    bookList.append(div);
                }
            });
            
            document.getElementById('my-requests').addEventListener('click', function(){
                requestText.innerHTML = '';
                data.myRequests.forEach(function(request){
                    requestText.innerHTML += '<div class="text-primary">Title:&nbsp;' + request.title + '<button class="btn-link"><i class="fa fa-times cancel-request" aria-hidden="true" onclick="cancelRequest(this)" style="font-size:25px;" id=\".' + request._id + '\"></i></button></div>';
                });
            });
            
            document.getElementById('requests-for-me').addEventListener('click', function(){
                requestText.innerHTML = '';
                data.books.forEach(function(book){
                    if(book.status.code === 'requested'){
                        requestText.innerHTML = '<div class="text-center text-danger">Title:&nbsp;' + book.title + '<button class="btn-link"><i class="fa fa-check approve-request" aria-hidden="true" onclick="approveRequest(this)" style="font-size:25px;" id=\"*' + book._id + '\"></i></button><button class="btn-link"><i class="fa fa-times cancel-request" aria-hidden="true" onclick="cancelRequest(this)" style="font-size:25px;" id=\"&' + book._id + '\"></i></button></div>';
                    }
                });
            });
            
            document.getElementById('traded').addEventListener('click', function(){
               requestText.innerHTML = '';
                data.books.forEach(function(book){
                    if(book.status.code === 'traded'){
                        requestText.innerHTML = '<div class="text-right text-success"><span class="trade-success">Title:&nbsp;' + book.title + '</span></div>';
                    }
                });
            });
        });
        
        document.querySelector('.home').addEventListener('click', function(){
            window.location.href = appUrl;
        });
    });
    
})();