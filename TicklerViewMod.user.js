// ==UserScript==
// @name        Tickler View Completed
// @namespace   GongOscar
// @description Constant EForm Submit and Print button locations
// @include     */ticklerMain.jsp?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	25.02.07.0
// ==/UserScript==

//Changelog
//25.02.07.0 - added new buttons to show all active without provider limitations

//wait window load first

var myIDNum = '85'

window.addEventListener('load', function() {

  var compBut = document.createElement('input');
  compBut.type = 'button';
  compBut.id = 'compBut'
  compBut.name = 'compBut'
  compBut.value = 'All Completed'
  compBut.onclick = compButFunc
  compBut.setAttribute('style', 'width:80px;font-size:12px;padding:0px; background-color:cyan;');

  var bodyForAppend = document.querySelector('[class=HelpAboutLogout]').parentElement
  bodyForAppend.appendChild(compBut)

  var AllActiveBut = document.createElement('input');
  AllActiveBut.type = 'button';
  AllActiveBut.id = 'AllActiveBut'
  AllActiveBut.name = 'AllActiveBut'
  AllActiveBut.value = 'All Active'
  AllActiveBut.onclick = AllActiveButFunc
  AllActiveBut.setAttribute('style', 'width:80px;font-size:12px;padding:0px; background-color:lime;');

  var bodyForAppend = document.querySelector('[class=HelpAboutLogout]').parentElement
  bodyForAppend.appendChild(AllActiveBut)

	//document.body.appendChild(compBut);

  //--------- select the textbox area so I can start typing immediately
  var textBox = $('textarea[name="textarea"]')
  textBox.select()
}, false);




document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;


  switch(true){
      //Acknowledge  button
    case theAltKey && theKey==='1':
      compButFunc()
			break;

    default:
      break;
  }


}, true);


function compButFunc(){
  var selectList = $('[name="ticklerview"]')[0]
  selectList.value = "C"
  var selectAssignedTo = $('[name="assignedTo"]')[0]
  selectAssignedTo.value = "all"
  var reportBut = $('.mbttn[value*="Report"]')[0]
  reportBut.click()

}
function AllActiveButFunc(){
  var selectList = $('[name="ticklerview"]')[0]
  selectList.value = "A"
  var selectAssignedTo = $('[name="assignedTo"]')[0]
  selectAssignedTo.value = "all"
  var reportBut = $('.mbttn[value*="Report"]')[0]
  reportBut.click()

}

