//calculator logic
const display = document.getElementById(
    "calculator__display__numbers__current"
);
const prevDisplay = document.getElementById(
    "calculator__display__numbers__previous"
);

const joy = document.getElementById("joy");
//store numbers for calculations into array of 2 nums
let numbers = ["", ""];
//store operator as a string
let operator = "";

let lastClickedEqual = false;

const updateDisplay = () => {
    //concatenates all the data as a string to display
    let updateString = numbers[0] + operator + numbers[1];
    if (updateString.length <= 10) {
        display.innerText = updateString;
        joy.style.visibility = "hidden";
    } else {
        clear();
        display.innerText = "I ain't got that much space";
        joy.style.visibility = "visible";
        
    }
};

//one function to handle ALL button clicks, buttons are prefixed with num_ or sym_ to differentiate
const handleBtnClick = (event) => {
    let buttonPressed = event.target.id.split("_");
    if (buttonPressed[1] === "period") buttonPressed[1] = "."; //little hacky but this is the easy way to get the period in there without rewriting all logic
    // append numbers to the correct numbers array position depending on whether the 
    // last button clicked was an equal sign or not and whether an operator is present or not
    if (buttonPressed[0] === "num" && lastClickedEqual === false) {
        if (operator === "") {
            numbers[0] += buttonPressed[1];
        } else {
            numbers[1] += buttonPressed[1];
        }
    } else if (buttonPressed[0] === "num" && lastClickedEqual === true) {
        let lastCalc = display.innerText;
        clear();
        numbers[0] += buttonPressed[1];
        prevDisplay.innerText = lastCalc;
    } else {
        if (numbers[0] !== "") {
            //switch case to deal with the different sybmols
            switch (buttonPressed[1]) {
                case "plus":
                    operator = '+';
                    lastClickedEqual = false;
                    break;
                    case "minus":
                    operator = '-';
                    lastClickedEqual = false;
                    break;
                    case "times":
                    operator = '×';
                    lastClickedEqual = false;
                    break;
                case "divide":
                    operator = '÷';
                    lastClickedEqual = false;
                    break;
                case "equal":
                    evaluateCalc();
                    break;
                case "clear":
                    clear();
                    break;
                default:
                    return;
            }
        } else if (buttonPressed[1] === "clear"){
            clear();
            return;
        } else {
            return;
        }
    }
    //update display after every key press 
    updateDisplay();
};

const clear = () => {
    numbers = ["", ""];
    operator = "";
    prevDisplay.innerText = "";
    updateDisplay();
    lastClickedEqual = false;
};

const evaluateCalc = () => {
    let result;
    //switch case to calculate result appropriately based on operator
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

    //update display including prevDisplay to show calculation that has previously taken place
    let previousCalc = display.innerText;
    clear();
    //adding number to a string to keep data consistent
    numbers = ['' + parseFloat(result.toFixed(4)), ""];
    updateDisplay();
    prevDisplay.innerHTML = previousCalc + '=';
    lastClickedEqual = true;
};
