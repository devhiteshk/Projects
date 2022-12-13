import React from "react";
let currVal = "0";
let currentKey = "";
let currentNumber = "";

function Padkeys({ data, setCurrentVal, setCalculatedVal, currentVal }) {
  const giveElert = () => {
    setCurrentVal("Length is Exceeded");
    setTimeout(() => setCurrentVal(currVal), 1000);
    return true;
  };

  const checkDecimal = () => {
    let decimalCount = 0;
    for (let i = 0; i < currentNumber.length; i++) {
      if (currentNumber[i] === ".") {
        decimalCount += 1;
      }
    }
    if (decimalCount > 1) {
      let temp = currVal.substring(0, currVal.length - 1);
      currVal = temp;
      currentNumber = currVal;
    }
  };

  const removeSecondLast = () => {
    const arr = ["+", "*", "/"];
    let flag1 = false;
    let flag2 = false;
    let last_val = currVal[currVal.length - 1];
    let slast_val = currVal[currVal.length - 2];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === last_val) {
        flag1 = true;
        break;
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === slast_val) {
        flag2 = true;
        break;
      }
    }

    if ((flag1 === true) & (flag2 === true) || last_val === slast_val) {
      let temp = currVal.substring(0, currVal.length - 2);
      currVal = temp + currVal[currVal.length - 1];
    }

    if (
      (slast_val === "+") & (last_val === "-") ||
      (slast_val === "-") & (last_val === "+") ||
      (slast_val === "-") & (last_val === "*") ||
      (slast_val === "-") & (last_val === "/")
    ) {
      let temp = currVal.substring(0, currVal.length - 2);
      currVal = temp + currVal[currVal.length - 1];
    }

    let checkSecondLast = currVal[currVal.length - 2];
    let lastValue = currVal[currVal.length - 1];
    if (checkSecondLast === "*" || checkSecondLast === "/") {
      if (
        (checkSecondLast === "*") & (lastValue === "+") ||
        (checkSecondLast === "/") & (lastValue === "+") ||
        (checkSecondLast === "*") & (lastValue === "*") ||
        (checkSecondLast === "*") & (lastValue === "/") ||
        (checkSecondLast === "/") & (lastValue === "/") ||
        (checkSecondLast === "/") & (lastValue === "*")
      ) {
        let temp = currVal.substring(0, currVal.length - 2);
        currVal = temp + currVal[currVal.length - 1];
      }
    }
  };

  const checkLength = () => {
    if (currVal === "0") {
      currVal = "";
    }
    if (currVal.length > 26) {
      return giveElert();
    }
  };

  const handleClick = (e) => {
    const clName = e.target.className.split(" ")[1];
    // console.log(currVal);
    switch (clName) {
      case "one":
        if (checkLength()) {
          break;
        }
        currVal += "1";
        currentNumber += "1";

        setCurrentVal(currVal);
        break;
      case "two":
        if (checkLength()) {
          break;
        }
        currVal += "2";
        currentNumber += "2";
        setCurrentVal(currVal);
        break;
      case "three":
        if (checkLength()) {
          break;
        }
        currVal += "3";
        currentNumber += "3";
        setCurrentVal(currVal);
        break;
      case "four":
        if (checkLength()) {
          break;
        }
        currVal += "4";
        currentNumber += "4";
        setCurrentVal(currVal);
        break;
      case "five":
        if (checkLength()) {
          break;
        }
        currVal += "5";
        currentNumber += "5";
        setCurrentVal(currVal);
        break;
      case "six":
        if (checkLength()) {
          break;
        }
        currVal += "6";
        currentNumber += "6";
        setCurrentVal(currVal);
        break;
      case "seven":
        if (checkLength()) {
          break;
        }
        currVal += "7";
        currentNumber += "7";
        setCurrentVal(currVal);
        break;
      case "eight":
        if (checkLength()) {
          break;
        }
        currVal += "8";
        currentNumber += "8";
        setCurrentVal(currVal);
        break;
      case "nine":
        if (checkLength()) {
          break;
        }
        currVal += "9";
        currentNumber += "9";
        setCurrentVal(currVal);
        break;
      case "zero":
        if (checkLength()) {
          break;
        }
        currVal += "0";
        currentNumber += "0";
        setCurrentVal(currVal);
        break;
      case "add":
        currentKey = "+";
        if (checkLength()) {
          break;
        }
        currVal += "+";
        currentNumber = "";
        removeSecondLast();
        setCurrentVal(currVal);
        break;
      case "subtract":
        currentKey = "-";
        if (checkLength()) {
          break;
        }
        currVal += "-";
        currentNumber = "";
        removeSecondLast();
        setCurrentVal(currVal);
        break;
      case "multiply":
        currentKey = "*";

        if (checkLength()) {
          break;
        }
        currVal += "*";
        currentNumber = "";
        removeSecondLast();
        setCurrentVal(currVal);
        break;
      case "divide":
        currentKey = "/";
        if (checkLength()) {
          break;
        }
        currVal += "/";
        currentNumber = "";
        removeSecondLast();
        setCurrentVal(currVal);
        break;
      case "decimal":
        currentKey = ".";
        if (checkLength()) {
          break;
        }
        currVal += ".";
        currentNumber += ".";
        checkDecimal();
        removeSecondLast();
        setCurrentVal(currVal);
        break;
      case "clear":
        currVal = "0";
        currentNumber = "";
        setCurrentVal(currVal);
        setCalculatedVal("0");
        break;
      case "equals":
        //somthing crazy here
        //   setCurrentVal(currVal);
        let calValue = eval(currVal);
        // console.log(calValue);
        currentNumber = calValue;
        currVal = calValue;

        if (calValue == "-") {
          setCalculatedVal("NaN");
        } else {
          setCalculatedVal(calValue);
        }
        setCurrentVal(currVal);
        break;

      default:
        break;
    }
  };

  return (
    <div id={data.id} className={`pad-key ${data.id}`} onClick={handleClick}>
      {data.content}
    </div>
  );
}

export default Padkeys;
