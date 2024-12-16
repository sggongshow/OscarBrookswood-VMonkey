// ==UserScript==
// @name        Billing Keyboard Shortcut
// @namespace   GongOscar
// @description Constant EForm Submit and Print button locations
// @include     *billing.clinicaid.ca/#/invoice/add?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js
// @grant       GM_addStyle
// @version	24.12.15.1
// ==/UserScript==

//brookswood  - ClinicAid
//Changlog
// 24.12.15.0 - added on check to save if not adding more codes. and add bill only if dx code filled
// 24.12.15.1 - added automatic service billing start and end times


var totalValue
//wait window load first
window.addEventListener('load', function() {

}, false);


document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;



  switch(true){
      //Confirm  button
    case theAltKey && theKey==='1':
      var addButton = $('button[class="btn btn-sm btn-black"][ca-name="add_service_code_button"]')[0]
      var codeBox = document.querySelectorAll('input[id="input-billed_service_code"]')[0]
      var dxBox1 = document.querySelectorAll('input[id="input-diagnostic_code_1"]')[0]
      //console.log(addButton)
      var SaveButton = $('button[class="btn btn-primary"][uib-tooltip*="Save"]')[0]
      //console.log(SaveButton)

      totalValue = $('span[class="total-value ng-binding"]')[0]
      totalValue = parseInt(totalValue.innerText.split('$')[1])
      //console.log(totalValue)

      if (totalValue >0 && codeBox.value.length == 0) { //save Total bill if there is billing and No new code entered
        SaveButton.click()
        break;
      }
      else{                 //Save billing line
        if (dxBox1.value.length > 0){              // make sure DX code is filled
          console.log ("adding button")
          checkDayCodes()
          addButton.click()
          break;
        }
      }


    default:
      break;
  }



}, true);

function checkDayCodes(){
  console.log("runing check")
    var codeBox = document.querySelectorAll('input[id="input-billed_service_code"]')[0]
    var startTimeBox = document.querySelectorAll('input[id="input-service_start_time"]')[0]
    var endTimeBox = document.querySelectorAll('input[id="input-service_end_time"]')[0]

    if (parseInt(codeBox.value) == 98040 || parseInt(codeBox.value) == 98010 ) {
      startTimeBox.value = "0900"
      endTimeBox.value = "1600"
    }
    else if (parseInt(codeBox.value) == 98041 || parseInt(codeBox.value) == 98011 ) {
      autoTimeInputLFP2()
    }
}

function autoTimeInputLFP2(){ //duplicate for 98011 due to custom later time usually.
  console.log("running lfp2")

  var codeBox = document.querySelectorAll('input[id="input-billed_service_code"]')[0]
  var startTimeBox = document.querySelectorAll('input[id="input-service_start_time"]')[0]
  var endTimeBox = document.querySelectorAll('input[id="input-service_end_time"]')[0]
  var serviceCodeUnits = document.querySelectorAll('input[id="input-billed_service_units"]')[0]

  var hours = parseInt(serviceCodeUnits.value)/4;

  //randomize start time for indirect care
  var startHourArray = [18,19,20,21]
  var startMinArray = [0,15,30,45]
  var randomHour = startHourArray[Math.floor(Math.random()*startHourArray.length)]
  var randomMin = startMinArray[Math.floor(Math.random()*startMinArray.length)]
    console.log(randomHour)
    console.log(randomHour)



  var startHour = new Date(2022, 0, 1, randomHour, randomMin, 0)
  var startHourPrint = moment(startHour).format('HHmm')

  var endHour = moment(startHour).add(hours, 'hours')
  var endHourPrint = moment(endHour).format('HHmm')

  startTimeBox.value = startHourPrint
  endTimeBox.value = endHourPrint


}


