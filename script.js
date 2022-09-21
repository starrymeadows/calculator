let calcNum = [];
let currentNum = null;
let calculator = {
    a: null,
    b: null,
    operator: null,
};

// calculator basic logic
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return "Nope."
    return (a / b);
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            currentNum = add(a, b);
            break;
        case "-":
            currentNum = subtract(a, b);
            break;
        case "x":
            currentNum = multiply(a, b);
            break;
        case "/":
            currentNum = divide(a, b);
            break;
        default:
            currentNum = "Oops!";
    }
}

// function to append clicked number (store in a, then store in b)
// store as array

// function to select operator

// populate display

const numBtns = document.querySelectorAll('.number');
const operBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');

const display = document.querySelector('.display');


numBtns.forEach(button =>
    button.addEventListener('click', () => appendNumber(button.textContent))
    );

operBtns.forEach(button =>
    button.addEventListener('click', () => handleOperator(button.textContent))
    );

clearBtn.addEventListener('click', () => {
    calculator.a = null;
    calculator.b = null;
    calculator.operator = null;
    calcNum = [];
    currentNum = 0;
    updateDisplay();
});

deleteBtn.addEventListener('click', () => {
    if (calcNum.length === 0) calcNum = currentNum.toString().split("");
    calcNum.pop();
    convertNum();
    updateDisplay();
})

function appendNumber(num) {
    calcNum.push(num);
    convertNum();
    updateDisplay();
}

function convertNum() {
    currentNum = calcNum.toString().replace(/[^\d\.]/g, "");
    if (currentNum.length > 11) currentNum = currentNum.toFixed(11);
    currentNum = +currentNum;
}

function updateDisplay() { 
    display.textContent = currentNum;
}

function handleOperator(operator) {
    if (calculator.a === null) {
        calculator.a = currentNum;
        calculator.operator = operator;
        calcNum = [];
    } else if (calculator.operator == "=") {
        calculator.operator = operator;
    } else {
        calculator.b = currentNum;
        evaluate();
        calculator.operator = operator;
    };
}

function evaluate() {
    operate(calculator.operator, calculator.a, calculator.b);
    updateDisplay();
    calculator.a = currentNum;
    calculator.b = null;
    calcNum = [];
}