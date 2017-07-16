'use strict';

(function () {

   var profileUsername = document.querySelector('#profile-username') || null;
   var displayName = document.querySelector('#display-name');
   var cityName = document.querySelector('#city-name') || null;
   var stateName = document.querySelector('#state-name') || null;
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject.github, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject.github, displayName, 'username');
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject.github, profileUsername, 'username');   
      }
      
      if (cityName !== null) {
         updateHtmlElement(userObject, cityName, 'city');
      }
      
      if (stateName !== null) {
         updateHtmlElement(userObject, stateName, 'state');
      }

   }));
})();
