// ==UserScript==
// @name        WCB Juno to ClinicAid V2 - CLINICAID SIDE
// @namespace   GongOscar
// @description Autofills boxes from data given from the associated Oscar side of the script
// @include     *billing.clinicaid.ca/#/invoice/add?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version		  25.08.12.2
// ==/UserScript==

//changelog
// 25.08.12.2 - creation

var wcbBut
var mspBut
var autoWCBBut
var dataBox

window.addEventListener('load', function () {
  console.log("Clinidaid Side")

  //var whereToAppend = document.getElementById("center-panel-wrapper")
  var whereToAppend = document.getElementById("content-with-sidebar")

  whereToAppend.appendChild(document.createElement('br'));

  //Generate Button
  wcbBut = document.createElement('input');
  wcbBut.type = 'button';
  wcbBut.value = 'Enable WCB Script';
  wcbBut.onclick = enableWCB;
  wcbBut.setAttribute('style', 'width:180px;font-size:16px;z-index:1; background-color: cyan; display:inline-block');
  whereToAppend.appendChild(wcbBut);

  mspBut = document.createElement('input');
  mspBut.type = 'button';
  mspBut.value = 'Back to MSP';
  mspBut.onclick = mspEnable;
  mspBut.setAttribute('style', 'width:180px;font-size:16px;z-index:1; background-color: yellow; display: none;');
  whereToAppend.appendChild(mspBut);

  autoWCBBut = document.createElement('input');
  autoWCBBut.type = 'button';
  autoWCBBut.value = 'RUN SCRIPT (5-10 seconds)';
  autoWCBBut.onclick = wcbAutoFill;
  autoWCBBut.setAttribute('style', 'width:220px;font-size:16px;z-index:1; background-color: lime; display: none;');
  whereToAppend.appendChild(autoWCBBut);

  //textarea
  dataBox = document.createElement('textarea');
  dataBox.id = 'dataRaw'
  dataBox.name = 'dataRaw'

  dataBox.setAttribute('style', 'width:600px; height:200px;font-size:16px;z-index:1; display: none; border: 4px solid lime;');
  dataBox.placeholder = 'Please Wait, Takes about 5-10 second for this text box to be enabled.\n Paste the data Generated from Juno WCB EFORM page here';

  whereToAppend.appendChild(document.createElement('br'));
  whereToAppend.appendChild(dataBox);

}, true);


async function enableWCB (){
  wcbBut.style.display = 'none'
  mspBut.style.display = 'inline-block'
  autoWCBBut.style.display = 'inline-block'
  dataBox.style.display = 'inline-block'

  var advTab = document.getElementsByName("advanced-map")[0].children[0]
  advTab.click();

  await new Promise(resolve => setTimeout(resolve, 200));
  //enable dropdown, then click WCB
  var dropdown = document.querySelector('input[id^="input-submission_type-"]')
  dropdown.value = ""
  dropdown.dispatchEvent(new Event('change', {bubbles: true}))
  document.querySelector('a[title="WCB"]').click();

  await new Promise(resolve => setTimeout(resolve, 200));

  var wcbTab = document.getElementsByName("wcb-map")[0].children[0]
  wcbTab.click();

}


async function mspEnable (){
  wcbBut.style.display = 'inline-block'
  mspBut.style.display = 'none'
  autoWCBBut.style.display = 'none'
  dataBox.style.display = 'none'


  var advTab = document.getElementsByName("advanced-map")[0].children[0]
  advTab.click();

  await new Promise(resolve => setTimeout(resolve, 200));
  //enable dropdown, then click WCB
  var dropdown = document.querySelector('input[id^="input-submission_type-"]')
  dropdown.value = ""
  dropdown.dispatchEvent(new Event('change', {bubbles: true}))
  document.querySelector('a[title="MSP"]').click();

  await new Promise(resolve => setTimeout(resolve, 200));

  var servCodeTab = document.getElementsByName("service-codes-map")[0].children[0]
  servCodeTab.click();
}

async function wcbAutoFill (){
  //fill personal data
  document.getElementsByClassName("btn btn-sm btn-success")[0].click()

  //get current form
  var orderedFormArray = await OrderedElementsArray()
  console.log(orderedFormArray)

  //get data from text box
  var getData = document.getElementById("dataRaw").value
  var dataArray = getData.split("/*/")
  dataArray.pop()
  console.log(dataArray)

  for (let i = 0; i < orderedFormArray.length; i++) {
  //for (let i = 0; i < 14; i++) {
    if(orderedFormArray[i].type == "checkbox"){
      if (dataArray[i] =="Y") {orderedFormArray[i].checked = true;      }
      else{ orderedFormArray[i].checked = false; }
      orderedFormArray[i].dispatchEvent(new Event('change', {bubbles: true}));
    }
    else if(orderedFormArray[i].tagName == "SELECT"){
      orderedFormArray[i].value = "string:" + dataArray[i]
    }
    else if(orderedFormArray[i] instanceof NodeList){
      var dateArr = dataArray[i].split("-")
      orderedFormArray[i][0].value = dateArr[0]
      orderedFormArray[i][1].value = dateArr[1]
      orderedFormArray[i][2].value = dateArr[2]
    } else if(orderedFormArray[i] == ""){
      //do nothing. empty
    }
    else{
      // for normal text boxes
      orderedFormArray[i].value = dataArray[i]
    }


  }

  dataBox.value = "SCRIPT HAS RUN. PLEASE DOUBLE CHECK ACCURACY.\n 1) Make Sure to Select Initial/Follow-Up Report at top of page.\n 2) Bill codes: " + dataArray[12] + " and " + dataArray[13] + ". And Use ICD9 code: " + dataArray[14]
}

async function OrderedElementsArray(){
//order of data: emply name, operating address, operatingcity, employ areaphone, employ phone, reg physician, long known, who render, prior problem
//date service, date inj, diag, wcb code, service code, icd9, bodypart, side, nature of inj, disabled?, disabled date, clinical info
//capable work, estimated rtw, rehab able?, consult wcb?, maximal recovery date, further correspondence?

  var ElementsArray = []
  ElementsArray.push(document.getElementById("input-employer_name"))
  ElementsArray.push(document.getElementById("input-work_location"))
  ElementsArray.push(document.getElementById("input-employer_city"))
  ElementsArray.push(document.getElementById("input-employer_phone_area_code"))
  ElementsArray.push(document.getElementById("input-employer_phone_number"))

  ElementsArray.push(document.getElementById("input-regular_practitioner")) // reg physician ---- TOGGLE
  ElementsArray.push(document.getElementById("input-patient_duration")) //long known
  ElementsArray.push(document.getElementById("input-who_rendered_first_service"))
  ElementsArray.push(document.getElementById("input-prior_problems"))
  ElementsArray.push("") //date service - skipped for billing

  ElementsArray.push(document.querySelectorAll('input[id*="input-date_of_injury"]'))//date inj   +++DATE
  ElementsArray.push(document.getElementById("input-injury_description"))//diag
  ElementsArray.push("")//wcb code - skipped, for billing
  ElementsArray.push("")//service code - skipped, for billing page
  ElementsArray.push("")//icd9 - for billing

  ElementsArray.push(document.getElementById("input-area_of_injury")) //bodypart ***Drop
  ElementsArray.push(document.getElementById("input-anatomical_position")) //side ***Drop
  ElementsArray.push(document.getElementById("input-nature_of_injury")) //nature inj ***Drop
  ElementsArray.push(document.getElementById("input-disabled_from_work")) //disabled  ---TOGGLE
  ElementsArray.push(document.querySelectorAll('input[id*="input-disability_date"]')) //disabled date ++++DATE

  ElementsArray.push(document.getElementById("input-clinical_info")) //clinical notes
  ElementsArray.push(document.getElementById("input-full_duties")) //capable work ---TOGGLE
  ElementsArray.push(document.getElementById("input-estimated_time_off")) //estimated rtw   ****Dropdown
  ElementsArray.push(document.getElementById("input-rehab_ready")) //rehab able? ---TOGGLE
  ElementsArray.push(document.getElementById("input-consult_with_wcb")) //consult wcb ---TOGGLE

  ElementsArray.push(document.querySelectorAll('input[id*="input-maximal_medical_recovery_date"]')) //maximal recovery ++++DATE
  ElementsArray.push(document.getElementById("input-additional_info")) //further correspondence ---TOGGLE

  return ElementsArray
}
