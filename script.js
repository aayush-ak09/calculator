let displayValue = '0';
let operand1 = null;
let operand2 = null;
let operator = null;
let resultDisplayed = false;
let calculatorOn = true; 



document.addEventListener('DOMContentLoaded', function(){  // turn the calculator off by default
    toggleOnOff();
})




function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    operand1 = null;
    operand2 = null;
    operator = null;
    resultDisplayed = false;
    updateDisplay();
}









function toggleOnOff() {
    const button = document.getElementById('btn-on-off');
    console.log('Turning mode');
    calculatorOn = !calculatorOn; // Toggle calculator state
    console.log('Calculator On:', calculatorOn);
    if (calculatorOn) {
        button.textContent = 'Off';
        clearDisplay();
        document.querySelector('.display').classList.remove('calculator-off');
    } else {
        button.textContent = 'On';
        clearDisplay();
        document.querySelector('.display').classList.add('calculator-off');
    }
}










function appendDigit(digit) {      //digit must be  in string 
    if (displayValue === '0' || resultDisplayed) {
        displayValue = digit;
        resultDisplayed = false;
    } else {
        displayValue += digit;   //concate
    }
    updateDisplay();
}










function setOperator(op) {
    if (operand1 === null) {
        operand1 = parseFloat(displayValue);
        operator = op;
        displayValue = '0';
    } else if (operand2 === null) {
        operand2 = parseFloat(displayValue);
        operand1 = operate(operator, operand1, operand2);
        operator = op;
        operand2 = null;
        displayValue = '0';
    }
    updateDisplay();
}



function appendDecimal() {
    if (!displayValue.includes('.')) {  // Ensure only one decimal point is added
        displayValue += '.';
        updateDisplay();
    }
}






function operate(op, a, b) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '%':
            return (a/b)*100;
        default:
            return b;
    }
}







function calculate() {
    if (operand1 !== null && operator !== null) {
        operand2 = parseFloat(displayValue);
        operand1 = operate(operator, operand1, operand2);
        displayValue = operand1.toString();
        operand2 = null;
        operator = null;
        resultDisplayed = true;
        updateDisplay();
    }
}







// Function to handle backspace
function backspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1); 
    } else {
        displayValue = '0'; 
    }
    updateDisplay();
}


// Function to toggle the sign of displayValue
function changeSign() {
    if (displayValue === '0') {
        return; 
    }    
    if (displayValue.startsWith('-')) {
        displayValue = displayValue.slice(1); 
    } else {
        displayValue = '-' + displayValue; 
    }

    updateDisplay();
}





// Function to calculate square root
function squareRoot() {
    displayValue = Math.sqrt(parseFloat(displayValue));
    updateDisplay();
}


// Function to calculate square
function square() {
    displayValue = parseFloat(displayValue) ** 2;
    updateDisplay();
}











// Event listeners for numerical buttons
document.getElementById('btn-0').addEventListener('click', () => appendDigit('0'));
document.getElementById('btn-1').addEventListener('click', () => appendDigit('1'));
document.getElementById('btn-2').addEventListener('click', () => appendDigit('2'));
document.getElementById('btn-3').addEventListener('click', () => appendDigit('3'));
document.getElementById('btn-4').addEventListener('click', () => appendDigit('4'));
document.getElementById('btn-5').addEventListener('click', () => appendDigit('5'));
document.getElementById('btn-6').addEventListener('click', () => appendDigit('6'));
document.getElementById('btn-7').addEventListener('click', () => appendDigit('7'));
document.getElementById('btn-8').addEventListener('click', () => appendDigit('8'));
document.getElementById('btn-9').addEventListener('click', () => appendDigit('9'));
document.getElementById("btn-decimal").addEventListener('click', () => appendDigit('.'));


// Event listeners for operator buttons
document.getElementById('btn-add').addEventListener('click', () => setOperator('+'));
document.getElementById('btn-subtract').addEventListener('click', () => setOperator('-'));
document.getElementById('btn-multiply').addEventListener('click', () => setOperator('*'));
document.getElementById('btn-divide').addEventListener('click', () => setOperator('/'));
document.getElementById('btn-percent').addEventListener('click', () =>setOperator('%'));




// Event listener for equals button
document.getElementById('btn-equals').addEventListener('click', calculate);



// Event listener for clear button
document.getElementById('btn-on-off').addEventListener('click', toggleOnOff);



// Event listners for Special Keys
document.getElementById('btn-C').addEventListener('click', clearDisplay)
document.getElementById('btn-backspace').addEventListener('click', backspace);


// Event listner for uniary perator
document.getElementById('btn-plus-minus').addEventListener('click', changeSign);
document.getElementById('btn-sqrt').addEventListener('click', squareRoot);
document.getElementById('btn-square').addEventListener('click', square);




// Initial display update
updateDisplay();
