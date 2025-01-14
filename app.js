//Create references to the dropdown's
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

//Months are always the same
(function populateMonths(){
    for(let i = 0; i < months.length; i++){
        const option = document.createElement('option');
        option.textContent = months[i];
        monthSelect.appendChild(option);
    }
    monthSelect.value = "1";
})();

let previousDay;

function populateDays(month){
    //Delete all of the children of the day dropdown
    //if they do exist
    while(daySelect.firstChild){
        daySelect.removeChild(daySelect.firstChild);
    }
    //Holds the number of days in the month
    let dayNum;
    //Get the current year
    let year = yearSelect.value;

    if(month === '1' || month === '3' || 
    month === '5' || month === '7' || month === '8' 
    || month === '10' || month === '12') {
        dayNum = 31;
    } else if(month === '4' || month === '6' 
    || month === '9' || month === '11') {
        dayNum = 30;
    }else{
        //Check for a leap year
        if(new Date(year, 1, 29).getMonth() === 1){
            dayNum = 29;
        }else{
            dayNum = 28;
        }
    }
    //Insert the correct days into the day <select>
    for(let i = 1; i <= dayNum; i++){
        const option = document.createElement("option");
        option.textContent = i;
        daySelect.appendChild(option);
    }
    if(previousDay){
        daySelect.value = previousDay;
        if(daySelect.value === ""){
            daySelect.value = previousDay - 1;
        }
        if(daySelect.value === ""){
            daySelect.value = previousDay - 2;
        }
        if(daySelect.value === ""){
            daySelect.value = previousDay - 3;
        }
    }
}

function populateYears(){
    //Get the current year as a number
    let year = new Date().getFullYear();
    //Make the previous 100 years be an option
    for(let i = 0; i < 101; i++){
        const option = document.createElement("option");
        option.textContent = year - i;
        yearSelect.appendChild(option);
    }
}

populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function() {
    populateDays(monthSelect.value);
}
monthSelect.onchange = function() {
    populateDays(monthSelect.value);
}
daySelect.onchange = function() {
    previousDay = daySelect.value;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const AtoSText = document.getElementById("result_AtoS");
const missingNumberText = document.getElementById("result_missing_number");
const NCText = document.getElementById("result_number_combination");
const FiveElementText = document.getElementById("result_5elements");
const form = document.querySelector("form");

var x1 = document.getElementById("A_S");
var x2 = document.getElementById("missing_number");
var x3 = document.getElementById("number_combination");
var x4 = document.getElementById("fiveelements");

form.addEventListener("submit", startAnalysis);
form.addEventListener("reset", resetAll);

function resetAll(){
  AtoSText.textContent = "-";
  missingNumberText.textContent = "-";
  NCText.textContent = "-";
  FiveElementText.textContent = "-";
  
  x1.style.display = "none";
  x2.style.display = "none";
  x3.style.display = "none";
  x4.style.display = "none";
}

function startAnalysis(e){
  e.preventDefault();

  x1.style.display = "block";
  x2.style.display = "block";
  x3.style.display = "block";
  x4.style.display = "block";

  const inputDate = daySelect.value;
  const inputMonth = monthSelect.value;
  const inputYear = yearSelect.value;
  
  let date = inputDate;
  let month = inputMonth;
  let century = Math.floor((inputYear-1)/100);
  let year = inputYear - 1900;
  let arr = [];
  let arrAtoG = [];

  arr.push(0); //intentionally left blank
  arrAtoG.push(0); //intentionally left blank
  let valA = process1value(date);
  arr.push(valA);
  arrAtoG.push(valA);
  let valB = process1value(month);
  arr.push(valB);
  arrAtoG.push(valB);
  let valC = process2values(valA, valB);
  arr.push(valC);
  arrAtoG.push(valC);
  let valD = process1value(century);
  arr.push(valD);
  arrAtoG.push(valD);
  let valE = process1value(year);
  arr.push(valE);
  arrAtoG.push(valE);
  let valF = process2values(valD, valE);
  arr.push(valF);
  arrAtoG.push(valF);
  let valG = process2values(valC, valF);
  arr.push(valG);
  arrAtoG.push(valG);
  let valH = process2values(valC, valG);
  arr.push(valH);
  let valI = process2values(valF, valG);
  arr.push(valI);
  let valJ = process2values(valH, valI);
  arr.push(valJ);
  let valK = process2values(valA, valC);
  arr.push(valK);
  let valL = process2values(valB, valC);
  arr.push(valL);
  let valM = process2values(valK, valL);
  arr.push(valM);
  let valN = process2values(valD, valF);
  arr.push(valN);
  let valO = process2values(valE, valF);
  arr.push(valO);
  let valP = process2values(valN, valO);
  arr.push(valP);
  let valQ = process2values(valC, valC);
  let valR = process2values(valF, valF);
  let valS = process2values(valG, valG);
  let valCircleTop = process3values(valA, valE, valG);
  
  
  AtoSText.innerText = `A: ${valA}` + ` B: ${valB}` + ` C: ${valC}\n` +
                       ` D: ${valD}` + ` E: ${valE}` + ` F: ${valF}\n` +
                       ` G: ${valG}` + ` H: ${valH}` + ` I: ${valI}\n` +
                       ` J: ${valJ}\n` + ` K: ${valK}` + ` L: ${valL}` +
                       ` M: ${valM}\n` + ` N: ${valN}` + ` O: ${valO}` + ` P: ${valP}`;

  //find missing numbers
  var missing_number;
  missing_number = " ";

  for (let i = 1; i < 10; i++){
      if (arrAtoG.includes(i,0) == false){
          missing_number = missing_number + i.toString() + ", ";
      }
  }

  missingNumberText.innerText = missing_number;

  //number combinations
  var str_nc = "";

  let nc1 = valA.toString() + valB.toString() + valC.toString();
  let nc2 = valD.toString() + valE.toString() + valF.toString();
  let nc3 = valC.toString() + valF.toString() + valG.toString();
  let nc4 = valC.toString() + valG.toString() + valH.toString();
  let nc5 = valF.toString() + valG.toString() + valI.toString();
  let nc6 = valI.toString() + valH.toString() + valJ.toString();
  let nc7 = valA.toString() + valC.toString() + valK.toString();
  let nc8 = valB.toString() + valC.toString() + valL.toString();
  let nc9 = valK.toString() + valL.toString() + valM.toString();
  let nc10 = valD.toString() + valF.toString() + valN.toString();
  let nc11 = valE.toString() + valF.toString() + valO.toString();
  let nc12 = valN.toString() + valO.toString() + valP.toString();
  let nc13 = valQ.toString() + valR.toString() + valS.toString();

  str_nc =    "1. 父基因(事业): "     + nc1 +
              "\n2. 母基因(婚姻): "   + nc2 +
              "\n3. 主性格: "         + nc3 +
              "\n4. 人生过程1: "      + nc4 +
              "\n5. 人生过程2: "      + nc5 +
              "\n6. 子女下属: "       + nc6 +
              "\n7. 事业过程1: "      + nc7 +
              "\n8. 事业过程2: "      + nc8+
              "\n9. 当下朋友: "       + nc9+
              "\n10. 婚姻过程1: "         + nc10 +
              "\n11. 婚姻过程2: "         + nc11 +
              "\n12. 未来财富/健康子媳: " + nc12 +
              "\n13. 隐藏号: "            + nc13;

  NCText.innerText = str_nc;

  //categorize into elements
  var ownAttribute, attr1, attr2, attr3, attr4;
  var qtyGold = 0;
  var qtyWater = 0;
  var qtyWood = 0;
  var qtyFire = 0;
  var qtyEarth = 0;
  var qtyAttribute = 0, qtyAttr1 = 0, qtyAttr2 = 0, qtyAttr3 = 0, qtyAttr4 = 0;

  if (valG == 1 || valG == 6) {
      ownAttribute = "金";
  }
  else if (valG == 2 || valG == 7) {
      ownAttribute = "水";
  }
  else if (valG == 3 || valG == 8) {
      ownAttribute = "火";
  }
  else if (valG == 4 || valG == 9) {
      ownAttribute = "木";
  }
  else if (valG == 5) {
      ownAttribute = "土";
  }

  for (let index = 1; index < 17; index++){
      if(arr[index] == 1 || arr[index] == 6){
          qtyGold = qtyGold + 1;
      }
      else if(arr[index] == 2 || arr[index] == 7){
          qtyWater = qtyWater + 1;
      }
      else if(arr[index] == 3 || arr[index] == 8){
          qtyFire = qtyFire + 1;
      }
      else if(arr[index] == 4 || arr[index] == 9){
          qtyWood = qtyWood + 1;
      }
      else if(arr[index] == 5){
          qtyEarth = qtyEarth + 1;
      }
  }

  if (ownAttribute == "金") {
      qtyAttribute = qtyGold;
      qtyAttr1 = qtyWater;
      qtyAttr2 = qtyWood;
      qtyAttr3 = qtyFire;
      qtyAttr4 = qtyEarth;
      attr1 = "水";
      attr2 = "木";
      attr3 = "火";
      attr4 = "土";
  }
  else if (ownAttribute == "水") {
      qtyAttribute = qtyWater;
      qtyAttr1 = qtyWood;
      qtyAttr2 = qtyFire;
      qtyAttr3 = qtyEarth;
      qtyAttr4 = qtyGold;
      attr1 = "木";
      attr2 = "火";
      attr3 = "土";
      attr4 = "金";
  }   
  else if (ownAttribute == "木") {
      qtyAttribute = qtyWood;
      qtyAttr1 = qtyFire;
      qtyAttr2 = qtyEarth;
      qtyAttr3 = qtyGold;
      qtyAttr4 = qtyWater;
      attr1 = "火";
      attr2 = "土";
      attr3 = "金";
      attr4 = "水";
  } 
  else if (ownAttribute == "火") {
      qtyAttribute = qtyFire;
      qtyAttr1 = qtyEarth;
      qtyAttr2 = qtyGold;
      qtyAttr3 = qtyWater;
      qtyAttr4 = qtyWood;
      attr1 = "土";
      attr2 = "金";
      attr3 = "水";
      attr4 = "木";
  } 
  else if (ownAttribute == "土") {
      qtyAttribute = qtyEarth;
      qtyAttr1 = qtyGold;
      qtyAttr2 = qtyWater;
      qtyAttr3 = qtyWood;
      qtyAttr4 = qtyFire;
      attr1 = "金";
      attr2 = "水";
      attr3 = "木";
      attr4 = "火";
  }

  var str2 = "";

  str2 =  ownAttribute + ": " + qtyAttribute.toString() + " [    自身   ]\n" +
          attr1 + ": " + qtyAttr1.toString() + " [子女/财富(我生)]\n" +
          attr2 + ": " + qtyAttr2.toString() + " [事业/伴侣(我克)]\n" +
          attr3 + ": " + qtyAttr3.toString() + " [官鬼/疾病(克我)]\n" +
          attr4 + ": " + qtyAttr4.toString() + " [父母/贵人(生我)]\n";

  FiveElementText.innerText = str2;
}               

function process1value(val1){
  var FirstDigit;
  var SecondDigit;
  var result;

  result = val1;

  while (result >= 10) {
      FirstDigit = parseInt(result.toString().charAt(0));
      SecondDigit = parseInt(result.toString().charAt(1));
      result = FirstDigit + SecondDigit;
  }

  return result;
}

function process2values(val1, val2){
  var FirstDigit;
  var SecondDigit;
  var result;

  result = val1 + val2;

  while (result >= 10) {
      FirstDigit = parseInt(result.toString().charAt(0));
      SecondDigit = parseInt(result.toString().charAt(1));
      result = FirstDigit + SecondDigit;
  }
  
  return result;
}

function process3values(val1, val2, val3){
  var FirstDigit;
  var SecondDigit;
  var result;

  result = val1 + val2 + val3;

  while (result >= 10) {
      FirstDigit = parseInt(result.toString().charAt(0));
      SecondDigit = parseInt(result.toString().charAt(1));
      result = FirstDigit + SecondDigit;
  }
  
  return result;
}
