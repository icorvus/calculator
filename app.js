function preventOverflow(number){
  number = number.toString()
  if (number.length > 12){
    number = number.slice(0, 12);
    if (number[11] === ".") {
      number = number.slice(0, 11);
    }
  }
  return number;
}


function add(numberA, numberB) {
  return preventOverflow(parseInt(numberA) + parseInt(numberB));
}

function substract(numberA, numberB) {
  return preventOverflow(numberA - numberB);
}

function multiply(numberA, numberB) {
  return preventOverflow((numberA * numberB));
}

function divide(numberA, numberB) {
  if (numberB == false) return "Try harder bud";
  return preventOverflow(numberA / numberB);
}

function root(numberA) {
  return preventOverflow(Math.sqrt(numberA));
}

function operate(operator, numberA, numberB) {
  switch(operator) {
    case '+':
      return add(numberA, numberB);
      break;
    case '-':
      return substract(numberA, numberB);
      break;
    case '*':
      return multiply(numberA, numberB);
      break;
    case '/':
      return divide(numberA, numberB);
      break;
    case 'sqrt':
      return root(numberA);
      break;
    default:
      alert(`${operator} is not yet available`)
  }
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

const displayContent = document.querySelector('.display-content');

const numberButtons = document.querySelectorAll('.number-key');
numberButtons.forEach(numberButton => {
  numberButton.addEventListener('click', populateDisplay);
  })


let inputReady = false;
let currentOperator;
let currentValue;

const clearEntryButton = document.getElementById('CE');
clearEntryButton.addEventListener('click', () => displayContent.textContent = "0");

const allClearButton = document.getElementById('AC');
allClearButton.addEventListener('click', () => {
  currentOperator = null;
  currentValue = null;
  displayContent.textContent = "0";
});

const backSpaceButton = document.querySelector('.backspace');
backSpaceButton.addEventListener('click', () => {
  displayContent.textContent = displayContent.textContent.slice(0, -1)
  if (displayContent.textContent.length <= 0) {
    displayContent.textContent = "0";
  }
});

const operatorButtons = document.querySelectorAll('.operate-key');
console.log(operatorButtons);
operatorButtons.forEach(button => button.addEventListener('click', calculate));

function calculate(event) {
  if (currentOperator) {
    displayContent.textContent = operate(currentOperator, currentValue, displayContent.textContent);
  }
  currentValue = displayContent.textContent;
  currentOperator = event.target.id;
  inputReady = true;
}

const sqrtButton = document.getElementById('sqrt');
sqrtButton.addEventListener('click', () => {
  displayContent.textContent = operate('sqrt', displayContent.textContent);
})


const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
  if (!currentValue || !currentValue) return;
  displayContent.textContent = operate(currentOperator, currentValue, displayContent.textContent);
  currentOperator = null;
  currentValue = null;
  inputReady = true;
})

const percentButton = document.querySelector('.percent');
percentButton.addEventListener('click', () => {
  if (!currentValue || !currentValue) return;
  displayContent.textContent = operate(currentOperator, currentValue, displayContent.textContent * 0.01);
  currentOperator = null;
  currentValue = null;
  inputReady = true;
})