// ==UserScript==
// @name        Tickler View Completed
// @namespace   GongOscar
// @description Constant EForm Submit and Print button locations
// @include     */ticklerMain.jsp?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			24.07.04.0
// ==/UserScript==


//wait window load first

var myIDNum = '85'

window.addEventListener('load', function() {

  var compBut = document.createElement('input');
  compBut.type = 'button';
  compBut.id = 'compBut'
  compBut.name = 'compBut'
  compBut.value = 'COMPLETED'
  compBut.onclick = compButFunc
  compBut.setAttribute('style', 'width:80px;font-size:12px;padding:0px; background-color:cyan;');

  var bodyForAppend = document.querySelector('[class=HelpAboutLogout]').parentElement
  bodyForAppend.appendChild(compBut)

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
  var reportBut = $('.mbttn[value*="Report"]')[0]
  reportBut.click()

}

