// ==UserScript==
// @name        Change default Schedule page layout
// @namespace   GongOscar - Juno
// @description Check if the daily 97570 billing has been submitted. Easily seen on day sheet
// @include     *providercontrol.jsp?*displaymode=day*
// @include     *provideradminday.jsp?*displaymode=day*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    24.07.04.2
// ==/UserScript==


//Changelog
// 24.07.04.0 - Juno Version first creation


window.addEventListener('load', function() {
  var multiProviders = false
  var providersCount = document.querySelectorAll('[id=providerSchedule]')
  console.log(providersCount)
  if (providersCount.length>1){
    multiProviders = true
  }

  if (multiProviders == true){
      //do nothing
  }else{
    var apptDescriptionArray = document.querySelectorAll('[class=apptLink]')

    for (var i = 0; i < apptDescriptionArray.length; i++) {
      apptDescriptionArray[i].innerHTML += "<strong>" + apptDescriptionArray[i].title.split('\n')[3] + "</strong>"
    }

  }


}, false);
