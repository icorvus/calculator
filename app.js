function add(numberA, numberB) {
  return numberA + numberB;
}

function substract(numberA, numberB) {
  return numberA - numberB;
}

function multiply(numberA, numberB) {
  return numberA * numberB;
}

function divide(numberA, numberB) {
  return numberA / numberB;
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
    default:
      alert(`${operator} is not yet available`)
  }
}

function populateDisplay(event) {
  if (event.target.textContent === ".") {
    if (displayContent.textContent.includes(".")) return;
    else if (displayContent.textContent.length > 10) return;
  }
  if (displayContent.textContent === "0") {
    if (event.target.textContent === "00" || event.target.textContent === "."){
      return;
    } else {
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

