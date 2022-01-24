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