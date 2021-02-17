"use strict";

/*
TODOs
- operator with no numbers[0] should ignore
- 
*/
var changeInputLayout = function changeInputLayout() {
  var iconClass = document.getElementById("changeLayoutIcon").classList;
  var displayClass = document.getElementById("numpad").classList;

  if (iconClass.contains("fa-circle")) {
    displayClass.remove("square");
    displayClass.add("circle");
    iconClass.remove("fa-circle");
    iconClass.add("fa-square");
  } else {
    displayClass.remove("circle");
    displayClass.add("square");
    iconClass.remove("fa-square");
    iconClass.add("fa-circle");
  }
}; //calculator logic


var display = document.getElementById("calculator__display__numbers__current");
var prevDisplay = document.getElementById("calculator__display__numbers__previous"); //store numbers for calculations into array of 2 nums

var numbers = ["", ""];
var operator = "";
var lastClickedEqual = false;

var updateDisplay = function updateDisplay() {
  var updateString = numbers[0] + operator + numbers[1];

  if (updateString.length <= 11) {
    display.innerText = updateString;
  } else {
    display.innerText = "I ain't got that much space";
  }
};

var handleBtnClick = function handleBtnClick(event) {
  var buttonPressed = event.target.id.split("_");

  if (buttonPressed[0] === "num" && lastClickedEqual === false) {
    if (operator === "") {
      numbers[0] += buttonPressed[1];
    } else {
      numbers[1] += buttonPressed[1];
    }
  } else if (buttonPressed[0] === "num" && lastClickedEqual === true) {
    var lastCalc = display.innerText;
    reset();
    numbers[0] += buttonPressed[1];
    prevDisplay.innerText = lastCalc;
  } else {
    if (numbers[0] !== "") {
      switch (buttonPressed[1]) {
        case "+":
        case "-":
        case "×":
        case "÷":
          operator = buttonPressed[1];
          lastClickedEqual = false;
          break;

        case "=":
          evaluateCalc();
          break;

        case "clear":
          reset();
          break;

        default:
          return;
      }
    } else {
      return;
    }
  }

  updateDisplay();
};

var reset = function reset() {
  numbers = ["", ""];
  operator = "";
  updateDisplay();
  prevDisplay.innerText = "";
  lastClickedEqual = false;
};

var evaluateCalc = function evaluateCalc() {
  var result;

  switch (operator) {
    case "+":
      result = Number(numbers[0]) + Number(numbers[1]);
      break;

    case "-":
      result = Number(numbers[0]) - Number(numbers[1]);
      break;

    case "×":
      result = Number(numbers[0]) * Number(numbers[1]);
      break;

    case "÷":
      result = Number(numbers[0]) / Number(numbers[1]);
      break;
  }

  var previousCalc = display.innerText;
  reset();
  numbers = ['' + parseFloat(result.toFixed(4)), ""];
  updateDisplay();
  prevDisplay.innerHTML = previousCalc + '=';
  lastClickedEqual = true;
};