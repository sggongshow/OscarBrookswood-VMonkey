// ==UserScript==
// @name        WCB Juno to ClinicAid V2 - OSCAR SIDE
// @namespace   GongOscar
// @description Generates data from Oscar-side BC-WCB form to be used with associated script for ClinicAid
// @include     */viewformwcb.do*
// @include     *forwardshortcutname.jsp?formname=BC-WCB*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version		  25.08.13.1
// ==/UserScript==

//Changelog
//25.08.13.1 = accounted for empty dates, and unchecked WCP

window.addEventListener('load', function () {
 console.log("clinicaid generate")

  //Generate Button
  var generateBut = document.createElement('input');
  generateBut.type = 'button';
  generateBut.value = 'Generate for ClinicAid';
  generateBut.onclick = generateData;
  generateBut.setAttribute('style', 'width:200px;font-size:16px;z-index:1; background-color: cyan');
  document.body.appendChild(generateBut);

  //textarea
  var dataBox = document.createElement('textarea');
  dataBox.id = 'dataRaw'
  dataBox.name = 'dataRaw'

  dataBox.setAttribute('style', 'width:600px; height:200px;font-size:16px;z-index:1;');
  document.body.appendChild(document.createElement('br'));
  document.body.appendChild(dataBox);

}, true);


function generateData()
{
//order of data: emplyee name, operating address, operatingcity, employ areaphone, employ phone, reg physician, long known, who render, prior problem
//date service, date inj, diag, wcb code, service code, icd9, bodypart, side, nature of inj, disabled?, disabled date, clinical info
//capable work, estimated rtw, rehab able?, consult wcb?, maximal recovery date, further correspondence?
  var dataArr = []

  dataArr.push(document.getElementsByName("w_empname")[0].value) //emp name
  dataArr.push(document.getElementsByName("w_opaddress")[0].value) //emp address
  dataArr.push(document.getElementsByName("w_opcity")[0].value) //emp address
  dataArr.push(document.getElementsByName("w_emparea")[0].value) //
  dataArr.push(document.getElementsByName("w_empphone")[0].value)

  //multiple choice
  var temp1 = document.getElementsByName("w_rphysician")
  var select1 = Array.from(temp1).find(element => element.checked);
  dataArr.push(select1.value)
  //multiple choice
  temp1 = document.getElementsByName("w_duration")
  select1 = Array.from(temp1).find(element => element.checked);
  dataArr.push(select1.value)
  dataArr.push(document.getElementsByName("w_ftreatment")[0].value)
  dataArr.push(document.getElementsByName("w_problem")[0].value)
  dataArr.push(document.getElementsByName("w_servicedate")[0].value)

  dataArr.push(document.getElementsByName("w_doi")[0].value)
  dataArr.push(document.getElementsByName("w_diagnosis")[0].value)
  dataArr.push(document.getElementsByName("w_feeitem")[0].value)
  dataArr.push(document.getElementsByName("w_extrafeeitem")[0].value)
  dataArr.push(document.getElementsByName("w_icd9")[0].value)

  dataArr.push(document.getElementsByName("w_bp")[0].value)
  dataArr.push(document.getElementsByName("w_side")[0].value) //N = NA, = Left, R = Right, B = left and right
  dataArr.push(document.getElementsByName("w_noi")[0].value)
  temp1 = document.getElementsByName("w_work")
  select1 = Array.from(temp1).find(element => element.checked);
  dataArr.push(select1.value)
  dataArr.push(document.getElementsByName("w_workdate")[0].value)

  dataArr.push(document.getElementsByName("w_clinicinfo")[0].value)
  temp1 = document.getElementsByName("w_capability")
  select1 = Array.from(temp1).find(element => element.checked);
  dataArr.push(select1.value)
  temp1 = document.getElementsByName("w_estimate")              //0=atwork, 1 = 1-6, 2= 7-13, 3=14-20, 9=20+
  select1 = Array.from(temp1).find(element => element.checked);
  dataArr.push(select1.value)
  temp1 = document.getElementsByName("w_rehab")
  select1 = Array.from(temp1).find(element => element.checked);
  dataArr.push(select1.value)
  temp1 = document.getElementsByName("w_wcbadvisor")
  select1 = Array.from(temp1).find(element => element.checked);
  dataArr.push(select1.value)

  dataArr.push(document.getElementsByName("w_estimatedate")[0].value)
  temp1 = document.getElementsByName("w_tofollow")
  select1 = Array.from(temp1).find(element => element.checked);
  dataArr.push(select1.value)

  //missed ones
  dataArr.push(document.getElementsByName("w_capreason")[0].value) //unable to work reason

  temp1 = document.getElementsByName("w_rehabtype")
  // var toPush = await getCheckedItem(temp1)
  select1 = Array.from(temp1).find(element => element.checked);
  if (select1 != undefined){dataArr.push(select1.value)}
  else{dataArr.push("")}
  // rehab program WCB vs Other

  console.log(dataArr)
  displayData(dataArr)
  openJuno()

}

function displayData(data){
  var textBox= document.getElementById("dataRaw")
  textBox.value = ""
  for (var i = 0; i < data.length; i++) {
    textBox.value += data[i] + "/*/";
  }
}

async function openJuno(){
    fullURL = window.location.href
    var elements = (window.location.pathname.split('/',2))
    var firstElement = (elements.slice(1)) //alert(firstElement)
    baseURL = ('https://' + location.host + '/' + firstElement + '/')
    console.log(baseURL)

    if (fullURL.includes("junoemr.com")){
      console.log("this is juno")
      var demoNum = (window.location.href.split('demographic_no=')[1].split("&")[0])
      var pathMasterRecord = baseURL + "demographic/demographiccontrol.jsp?demographic_no=" + demoNum + "&displaymode=edit"
      console.log(pathMasterRecord)

      var clinicAidLink = await fetchData(pathMasterRecord)
      console.log(clinicAidLink)
      //var clinicAidWindow = window.open(clinicAidLink, 'popupWindow');
      var messageToSend = "AAA*CCC*DDD/FFF/GGG"
      await openWindow(clinicAidLink)

    }
}

async function fetchData(pathLink) {
    try {
      const response = await fetch(pathLink);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const str = await response.text(); // or response.json() if it's JSON
      var outputArray = str.split("href=")
      var match = outputArray.find(item => item.includes("/billing.do?billRegion=CLINICAID&billForm=GP"));
      match = match.replace(/\s+/g, " ").trim();
      var URL2 = match.split("../")[1].split("target=")[0].slice(0, -2)
      var returnURL = baseURL + URL2
      console.log("billing link: " + returnURL)
      return returnURL;

    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }

async function openWindow(pathLink2) {
    console.log("Opening Window")
    var clinicAidWindow = window.open(pathLink2, 'popupWindow');

  }

async function getCheckedItem(item){
  select1 = Array.from(item).find(element => element.checked);

}
