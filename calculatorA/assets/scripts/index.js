/*
TODOs
- operator with no numbers[0] should ignore
- 
*/

const changeInputLayout = () => {
    let iconClass = document.getElementById("changeLayoutIcon").classList;
    let displayClass = document.getElementById("numpad").classList;
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
};

//calculator logic
const display = document.getElementById(
    "calculator__display__numbers__current"
);
const prevDisplay = document.getElementById(
    "calculator__display__numbers__previous"
);
//store numbers for calculations into array of 2 nums
let numbers = ["", ""];
let operator = "";
let lastClickedEqual = false;

const updateDisplay = () => {
    let updateString = numbers[0] + operator + numbers[1];
    if (updateString.length <= 11) {
        display.innerText = updateString;
    } else {
        display.innerText = "I ain't got that much space";
    }
};

const handleBtnClick = (event) => {
    let buttonPressed = event.target.id.split("_");
    if (buttonPressed[0] === "num" && lastClickedEqual === false) {
        if (operator === "") {
            numbers[0] += buttonPressed[1];
        } else {
            numbers[1] += buttonPressed[1];
        }
    } else if (buttonPressed[0] === "num" && lastClickedEqual === true) {
        let lastCalc = display.innerText;
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

const reset = () => {
    numbers = ["", ""];
    operator = "";
    updateDisplay();
    prevDisplay.innerText = "";
    lastClickedEqual = false;
};

const evaluateCalc = () => {
    let result;
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

    let previousCalc = display.innerText;
    reset();
    numbers = ['' + parseFloat(result.toFixed(4)), ""];
    updateDisplay();
    prevDisplay.innerHTML = previousCalc + '=';
    lastClickedEqual = true;
};
