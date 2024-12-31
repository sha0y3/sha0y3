window.onload = () => {
    document.getElementById('image').style.display = "none";
    const button1 = document.querySelector('#btn_analyse'); 
    button1.addEventListener('click',startAnalysis);
    const button2 = document.querySelector('#btn_reset'); 
    button2.addEventListener('click', resetAll);    
}

function startAnalysis() {
    const inputDate = document.querySelector('#date').value;
    const inputMonth = document.querySelector('#month').value;
    const inputYear = document.querySelector('#year').value;
    const result1 = document.querySelector('#result1');
    const result2 = document.querySelector('#result2');
    const result3 = document.querySelector('#result3');
    const result4 = document.querySelector('#result4');

    if(!inputDate || isNaN(inputDate) || inputDate < 0 || inputDate > 31) {
        result.innerText = "Please provide a valid date.";
        return;
    }
    else if (!inputMonth || isNaN(inputMonth) || inputMonth < 0 || inputMonth > 12) {
        result.innerText = "Please provide a valid month.";
        return;
    }
    else if (!inputYear || isNaN(inputYear) || inputYear < 1900 || inputYear > 2025) {
        result.innerText = "Please provide a valid year.";
        return;
    }

    let date = inputDate;
    let month = inputMonth;
    //let century = parseInt(inputYear.toString().substring(0,2));
    //let year = parseInt(inputYear.toString().substring(2,2));
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

    result1.innerText = `A: ${valA}` + ` B: ${valB}` + ` C: ${valC}` +
                       ` D: ${valD}` + ` E: ${valE}` + ` F: ${valF}` +
                       ` G: ${valG}` + ` H: ${valH}` + ` I: ${valI}\n` +
                       ` J: ${valJ}` + ` K: ${valK}` + ` L: ${valL}` +
                       ` M: ${valM}` + ` N: ${valN}` + ` O: ${valO}` + ` P: ${valP}` +
                       ` \n\n*** ` ;

    document.getElementById('image').style.display = "inline";
    
    //number combinations
    var str_nc = "";

    str_nc =    "1. 父基因(事业): "     + valA.toString() + valB.toString() + valC.toString() +
                "\n2. 母基因(婚姻): "   + valD.toString() + valE.toString() + valF.toString() +
                "\n3. 主性格: "         + valC.toString() + valF.toString() + valG.toString() +
                "\n4. 人生过程1: "      + valC.toString() + valG.toString() + valH.toString() +
                "\n5. 人生过程2: "      + valF.toString() + valG.toString() + valI.toString() +
                "\n6. 子女下属: "       + valI.toString() + valH.toString() + valJ.toString() +
                "\n7. 事业过程1: "      + valA.toString() + valC.toString() + valK.toString() +
                "\n8. 事业过程2: "      + valB.toString() + valC.toString() + valL.toString() +
                "\n9. 当下朋友: "       + valK.toString() + valL.toString() + valM.toString() +
                "\n10. 婚姻过程1: "         + valD.toString() + valF.toString() + valN.toString() +
                "\n11. 婚姻过程2: "         + valE.toString() + valF.toString() + valO.toString() +
                "\n12. 未来财富/健康子媳: " + valN.toString() + valO.toString() + valP.toString() +
                "\n13. 隐藏号: "            + valQ.toString() + valR.toString() + valS.toString()+
                ` \n\n*** ` ;

    result2.innerText = str_nc;

    //find missing numbers
    var missing_number;
    missing_number = " ";

    for (let i = 1; i < 10; i++){
        if (arrAtoG.includes(i,0) == false){
            missing_number = missing_number + i.toString() + " ";
        }
    }

    result3.innerText = "缺失号码：" + missing_number+
    ` \n\n*** ` ;

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

    str2 =  ownAttribute + ": " + qtyAttribute.toString() + " [自身]\n" +
            attr1 + ": " + qtyAttr1.toString() + " [子女/财富(我生)]\n" +
            attr2 + ": " + qtyAttr2.toString() + " [事业/伴侣(我克)]\n" +
            attr3 + ": " + qtyAttr3.toString() + " [官鬼/疾病(克我)]\n" +
            attr4 + ": " + qtyAttr4.toString() + " [父母/贵人(生我)]\n";

    result4.innerText = str2;
}

function resetAll(){
    document.getElementById('date').value = ''
    document.getElementById('month').value = ''
    document.getElementById('year').value = ''
    result1.innerText = "-";
    result2.innerText = "-";
    result3.innerText = "-";
    result4.innerText = "-";
    document.getElementById('image').style.display = "none";
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

