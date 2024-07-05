// ==UserScript==
// @name        Change default Schedule page layout
// @namespace   GongOscar - Juno
// @description Check if the daily 97570 billing has been submitted. Easily seen on day sheet
// @include     *providercontrol.jsp?*displaymode=day*
// @include     *provideradminday.jsp?*displaymode=day*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    24.07.04.0
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
      apptDescriptionArray[i].innerText += apptDescriptionArray[i].title.split('\n')[3]
    }

  }










  /*
  //check if the schedule view is multiple docs or just 1 doc. layout differs
  var multiProviders = false
  var providersCount = document.querySelectorAll('[id=providertable]')
  console.log(providersCount)
  if (providersCount.length>1){
    multiProviders = true
  }

  var apptDescriptionArray = document.querySelectorAll('[class^=reason_][class$=hideReason]')
  console.log(apptDescriptionArray)

  for (var i = 0; i < apptDescriptionArray.length; i++){  //apptDescriptionArray.length
    var apptSelected = apptDescriptionArray[i]
    //console.log(apptSelected)
    //apptSelected.innerHTML.replace("strong","TEST")
    //apptSelected.innerHTML.replace("/<\/strong>/g","TEST2")


    var apptHTML = apptSelected.innerHTML
   // console.log(apptHTML)
    //console.log ("--------------------------")



    var apptHTMLSplit = apptHTML.split("<strong>")
    //console.log(apptHTMLSplit)

    var apptBefore = apptHTMLSplit[0]
    var apptReason = apptHTMLSplit[1]
    //console.log(apptReason)

    var apptHTMLSplit2 = apptReason.split("</strong>")
    apptReason = apptHTMLSplit2[0]
    var apptAfter = apptHTMLSplit2[1]


    //apptReason.replace(/&nbsp;/g, "");
    //console.log ("--------------------------")
    //console.log(apptBefore)
    //console.log(apptReason)
    //console.log(apptAfter)


    apptReason = apptReason.substring(apptReason.indexOf(";")+1)

    //when there's multiple providers then don't do anything besides remove <strong>
    //when only single provider layout is differnt in 1 line so needs the <br> added
    if (multiProviders == false){
      //apptReason = "<br>" + apptReason + "<br>"
    }


    var apptHTMLNew = apptBefore + apptReason + apptAfter
    apptSelected.innerHTML = apptHTMLNew

  }
*/

}, false);


