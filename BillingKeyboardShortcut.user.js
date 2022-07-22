// ==UserScript==
// @name        Billing Keyboard Shortcut
// @namespace   GongOscar
// @description Constant EForm Submit and Print button locations
// @include     *billing.clinicaid.ca/#/invoice/add?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    22.07.22.0
// ==/UserScript==

//brookswood  - ClinicAid


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
      var subButton = $('button[class="btn btn-sm btn-black"][ca-name="add_service_code_button"]')[0] 
      //console.log(subButton)
      var SaveButton = $('button[class="btn btn-primary"][uib-tooltip*="Save"]')[0] 
      console.log(SaveButton)
      
      totalValue = $('span[class="total-value ng-binding"]')[0]
      totalValue = parseInt(totalValue.innerText.split('$')[1])
      console.log(totalValue)

      if (totalValue >0) { //save Total bill
        SaveButton.click()
        break;
      }
      else{                 //Save billing line
        subButton.click()
			  break;
      }
     
      
    default:
      break; 
  }
  
  
}, true);

