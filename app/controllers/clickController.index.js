'use strict';

(function(){
    var allBooks = document.getElementById('all');
    var myBooks = document.getElementById('my');
    
    ajaxFunctions.ready(function(){
       allBooks.addEventListener('click', function(){
           window.location.href = window.location.origin + '/all';
       });
       
       myBooks.addEventListener('click', function(){
           window.location.href = window.location.origin + '/my';
       });
    });
})();