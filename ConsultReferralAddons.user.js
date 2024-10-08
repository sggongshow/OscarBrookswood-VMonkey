// ==UserScript==
// @name        Consult Referral Addons
// @namespace   GongOscar - Clayton
// @description Consult Referal Addons
// @include     */ConsultationFormRequest.jsp*
// @include     *ViewRequest.do?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			24.07.04.1
// ==/UserScript==


//Changelog 
//24.07.04.1 - modified for Clayton
//23.07.24.1 - Added semicolon spacing button

window.addEventListener('load', function() {

  var faxNoteBut = document.createElement('input');
  faxNoteBut.type = 'button';
  faxNoteBut.id = 'faxNoteBut'
  faxNoteBut.name = 'faxNoteBut'
  faxNoteBut.value = 'Add "FAXED" note'
  faxNoteBut.onclick = faxNoteButFunc
  faxNoteBut.setAttribute('style', 'width:120px;font-size:12px;padding:0px; background-color:yellow;');

  var semiColonBut = document.createElement('input');
  semiColonBut.type = 'button';
  semiColonBut.id = 'semiColonBut'
  semiColonBut.name = 'semiColonBut'
  semiColonBut.value = 'SemiColon Spacing'
  semiColonBut.onclick = semiColonSpacing
  semiColonBut.setAttribute('style', 'width:120px;font-size:12px;padding:0px; background-color:cyan;');

  var appendBox = document.querySelectorAll('[name=submitSaveOnly]')[1].parentElement
  //var childElements = appendBox.children
  //appendBox = childElements[childElements.length-3]

  appendBox.appendChild(faxNoteBut);
  appendBox.appendChild(semiColonBut);



}, true);



function faxNoteButFunc(){
  var appointmentNoteBox = document.querySelector('[name="appointmentNotes"]')

  //get DATE
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  const currentDateText = `${day} ${month} ${year}`;
  console.log(currentDateText);

  //get Doctor

  const dropdownProvider = document.querySelector('select[name="providerNo"]');
  const DoctorUser = dropdownProvider.options[dropdownProvider.selectedIndex].text;
  appointmentNoteBox.value += "\n Faxed on " + currentDateText + " - " + DoctorUser

  // Pending specialist clicked
  document.getElementsByClassName("stat")[4].firstElementChild.click()


}

function semiColonSpacing(){
  var clinicalInfoBox = document.getElementById("clinicalInformation")
  var sigProblemsBox = document.getElementById("concurrentProblems")
  var currentMedsBox = document.getElementById("currentMedications")

  var newclincalInfoText = clinicalInfoBox.value.replace(/;/g, ";\n")
  clinicalInfoBox.value = newclincalInfoText
  var newsigProblemsBox = sigProblemsBox.value.replace(/;/g, ";\n")
  sigProblemsBox.value = newsigProblemsBox
  var newcurrentMedsBox = currentMedsBox.value.replace(/;/g, ";\n")
  currentMedsBox.value = newcurrentMedsBox


}
