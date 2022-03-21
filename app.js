function preventOverflow(number){
  number = number.toString();
  if (number.length > 12){
    number = number.slice(0, 12);
    number = parseFloat(number).toExponential(7);
    if (number[11] === ".") {
      number = number.slice(0, 11);
    }
  }
  return number;
}

function add(numberA, numberB) {
  return preventOverflow((parseFloat(numberA) * 10 + parseFloat(numberB) * 10) / 10);
}

function substract(numberA, numberB) {
  return preventOverflow((parseFloat(numberA) * 10 - parseFloat(numberB) * 10) / 10);
}

function multiply(numberA, numberB) {
  return preventOverflow((parseFloat(numberA) * parseFloat(numberB) * 10) / 10);
}

function divide(numberA, numberB) {
  if (numberB == false) return "Nice try!";
  return preventOverflow((parseFloat(numberA) * 10 / parseFloat(numberB)) / 10);
}

function root(numberA) {
  if (numberA < 0) return "Nice try!";
  return preventOverflow(Math.sqrt(numberA));
}

function operate(operator, numberA, numberB) {
  switch(operator) {
    case '+':
      return add(numberA, numberB);
    case '-':
      return substract(numberA, numberB);
    case '*':
      return multiply(numberA, numberB);
    case '/':
      return divide(numberA, numberB);
    case 'sqrt':
      return root(numberA);
    default:
      alert(`${operator} is not yet available`);
  }
}

function calculate(event) {
  if (currentOperator) {
    displayContent.textContent = operate(currentOperator, currentValue, displayContent.textContent);
  }
  currentValue = displayContent.textContent;
  if (event.detail !== 0){
    currentOperator = event.target.id;
  } else {
    currentOperator = event.key;
  }
  inputReady = true;
}

function populateDisplay(event) {
  if (inputReady) {
    displayContent.textContent = "0";
    inputReady= false;
  }
  if (event.target.textContent === ".") {
    if (displayContent.textContent.includes(".")) return;
    else if (displayContent.textContent.length > 10) return;
  }
  if (displayContent.textContent === "0") {
    if (event.target.textContent === "00"){
      return;
    } else if (event.target.textContent === "."){
      displayContent.textContent += event.target.textContent;
    }
     else {
      displayContent.textContent = event.target.textContent;
    }
  } else if (displayContent.textContent.length < 12) {
    if (event.target.textContent === "00" && displayContent.textContent.length === 11) {
      displayContent.textContent += "0";
    } else {
      displayContent.textContent += event.target.textContent;
    }
  }
}

function populateKeyDisplay(event) {
  if (isNaN(event.key) && event.key !== '.'  || event.key === ' ') return;
  if (inputReady) {
    displayContent.textContent = "0";
    inputReady= false;
  }
  if (event.key === ".") {
    if (displayContent.textContent.includes(".")) return;
    else if (displayContent.textContent.length > 10) return;
  }
  if (displayContent.textContent === "0") {
    if (event.key === "."){
      displayContent.textContent += event.key;
    } else {
      displayContent.textContent = event.key;
    }
  } else if (displayContent.textContent.length < 12) {
    displayContent.textContent += event.key;
  }
}

function equals() {
  if (!currentValue || !currentOperator) return;
  displayContent.textContent = operate(currentOperator, currentValue, displayContent.textContent);
  currentOperator = null;
  currentValue = null;
  inputReady = true;
}

function percentEquals() {
  if (!currentValue || !currentOperator) return;
  displayContent.textContent = operate(currentOperator, currentValue, displayContent.textContent * 0.01);
  currentOperator = null;
  currentValue = null;
  inputReady = true;
}

function clearAll() {
  currentOperator = null;
  currentValue = null;
  displayContent.textContent = "0";
}

function showSqrt() {
  displayContent.textContent = operate('sqrt', displayContent.textContent);
}

function backspace() {
  if (isNaN(displayContent.textContent)) {
    displayContent.textContent = "0";
    return;
  }
  displayContent.textContent = displayContent.textContent.slice(0, -1);
  if (displayContent.textContent.length <= 0 ||
     displayContent.textContent[0] === "-" &&  displayContent.textContent.length === 1) {
    displayContent.textContent = "0";
  }
}

function toggleNegative() {
  if (displayContent.textContent[0] !== "-") {
    displayContent.textContent = "-" + displayContent.textContent;
  } else {
    displayContent.textContent = displayContent.textContent.slice(1);
  }
}

let inputReady = false;
let currentOperator = null;
let currentValue = null;

const displayContent = document.querySelector('.display-content');

document.querySelectorAll('.number-key').forEach(numberButton => numberButton.addEventListener('click', populateDisplay));
document.getElementById('CE').addEventListener('click', () => displayContent.textContent = "0");
document.getElementById('AC').addEventListener('click', clearAll);
document.querySelector('.backspace').addEventListener('click', backspace);
document.querySelector('.plus-minus').addEventListener('click', toggleNegative);
document.querySelectorAll('.operate-key').forEach(button => button.addEventListener('click', calculate));
document.getElementById('sqrt').addEventListener('click', showSqrt);
document.querySelector('.equals').addEventListener('click', equals);
document.querySelector('.percent').addEventListener('click', percentEquals);

window.addEventListener('keydown', populateKeyDisplay);

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '=': case 'Enter':
      equals();
      break;
    case '+': case '-': case '*': case '/':
      calculate(event);
      break;
    case 'Backspace':
      backspace();
      break;
    case `c`: case 'C':
      clearAll();
      break;
    case 'Control':
      toggleNegative();
      break;
    case 's': case 'S':
      showSqrt();
      break;
  }
});
