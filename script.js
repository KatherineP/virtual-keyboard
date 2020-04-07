/* global document */
const firstRow = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
const secondRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
const thirdRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''];
const fourthRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
// const secondRowRus = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё'];
// const thirdRowRus = ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'];
// const fourthRowRus = ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/'];
const deleteButton = 'delete';
const tabButton = 'tab';
const capsButton = 'caps lock';
const returnButton = 'return';
const shiftButton = 'shift';
const ctrlButton = 'ctl';
const altButton = 'alt';
const commandButton = 'command';
const topArrowButton = '&uarr;';
const bottomArrowButton = '&darr;';
const rightArrowButton = '&rarr;';
const leftArrowButton = '&larr;';

const createNewDiv = (className, btnClassName, element) => {
  const div = document.createElement('div');
  div.classList = className;
  div.classList.add(btnClassName);
  div.innerHTML = `<p>${element}</p>`;
  return document.querySelector('.wrapper').append(div);
};

// wrapper
const div = document.createElement('div');
div.className = 'wrapper';
document.body.append(div);

// text area
const textArea = document.createElement('textarea');
textArea.className = 'text-area';
document.querySelector('.wrapper').append(textArea);

// first row english
firstRow.forEach((element) => {
  createNewDiv('button', 'btn', element);
});
createNewDiv('backspace-button', 'btn', deleteButton);

// second row english
createNewDiv('backspace-button', 'btn', tabButton);
secondRow.forEach((element) => {
  createNewDiv('button', 'btn', element);
});

// third row english
createNewDiv('backspace-button', 'btn', capsButton);
thirdRow.forEach((element) => {
  createNewDiv('button', 'btn', element);
});
createNewDiv('backspace-button', 'btn', returnButton);

// fourth row english
createNewDiv('backspace-button', 'btn', shiftButton);
fourthRow.forEach((element) => {
  createNewDiv('button', 'btn', element);
});
createNewDiv('arrow-button', 'btn', topArrowButton);
createNewDiv('backspace-button', 'btn', shiftButton);

// fifth row english
createNewDiv('arrow-button', 'btn', ctrlButton);
createNewDiv('arrow-button', 'btn', altButton);
createNewDiv('backspace-button', 'btn', commandButton);
createNewDiv('gap-button', 'btn', '');
createNewDiv('arrow-button', 'btn', altButton);
createNewDiv('arrow-button', 'btn', leftArrowButton);
createNewDiv('arrow-button', 'btn', bottomArrowButton);
createNewDiv('arrow-button', 'btn', rightArrowButton);
createNewDiv('arrow-button', 'btn', ctrlButton);

document.querySelector('.wrapper').addEventListener('mouseover', (event) => {
  const el = event.target.closest('.btn');
  if (!el) {
    return;
  }
  el.style.backgroundColor = 'pink';
});

document.querySelector('.wrapper').addEventListener('mouseout', (event) => {
  const el = event.target.closest('.btn');
  if (!el) {
    return;
  }
  el.style.backgroundColor = '';
});

// animation for mouse click event
const setTimer = (element) => {
  element.style.borderRadius = '20px';
  return setTimeout(() => element.style.borderRadius = '', 500);
};

const handleCapsLock = (startOfRow, endOfRow) => {
  for (let i = startOfRow; i < endOfRow; i++) {
    const a = Array.from(document.querySelector('.wrapper').querySelectorAll('.button'))[i];
    if (a.firstElementChild.style.textTransform === 'capitalize') {
      a.firstElementChild.style.textTransform = 'none';
    } else {
      a.firstElementChild.style.textTransform = 'capitalize';
    }
  }
};

document.querySelector('.wrapper').addEventListener('click', (event) => {
  if (event.target.closest('.btn')) {
    setTimer(event.target.closest('.btn'));
  }
  const elButton = event.target.closest('.button');
  const gapBtn = event.target.classList.contains('gap-button');
  const backspaceBtn = event.target.closest('.backspace-button');
  const arrowButton = event.target.closest('.arrow-button');

  if (elButton) {
    if (elButton.firstElementChild.style.textTransform === 'capitalize') {
      textArea.value += elButton.firstElementChild.innerHTML.toUpperCase();
    } else {
      textArea.value += elButton.firstElementChild.innerHTML;
    }
  } else if (gapBtn) {
    textArea.value += ' ';
  } else if (backspaceBtn && (backspaceBtn.firstElementChild.innerHTML === deleteButton)) {
    textArea.value = textArea.value.slice(0, -1);
  } else if (backspaceBtn && (backspaceBtn.firstElementChild.innerHTML === returnButton)) {
    textArea.value += '\n';
  } else if (backspaceBtn && (backspaceBtn.firstElementChild.innerHTML === capsButton)) {
    handleCapsLock(13, 23);
    handleCapsLock(26, 37);
    handleCapsLock(37, 44);
  } else if (backspaceBtn && (backspaceBtn.firstElementChild.innerHTML === tabButton)) {
    textArea.value += '    ';
  } else if (arrowButton) {
    if (arrowButton.firstElementChild.innerText === '←') {
      textArea.value += arrowButton.firstElementChild.innerText;
    } else if (arrowButton.firstElementChild.innerText === '↓') {
      textArea.value += arrowButton.firstElementChild.innerText;
    } else if (arrowButton.firstElementChild.innerText === '→') {
      textArea.value += arrowButton.firstElementChild.innerText;
    } else if (arrowButton.firstElementChild.innerText === '↑') {
      textArea.value += arrowButton.firstElementChild.innerText;
    }
  }
});

const animationForSpecialBtns = (arrayElem) => {
  Array.from(document.querySelectorAll('.btn'))[arrayElem].style.backgroundColor = 'pink';
  Array.from(document.querySelectorAll('.btn'))[arrayElem].style.borderRadius = '20px';
};

document.addEventListener('keydown', (event) => {
  document.querySelectorAll('.btn').forEach((el) => {
    if (el.firstElementChild.innerHTML === event.key && el.firstElementChild.style.textTransform === 'capitalize') {
      el.style.backgroundColor = 'pink';
      el.style.borderRadius = '20px';
      textArea.value += event.code.substr(-1);
    } else if (el.firstElementChild.innerHTML === event.key) {
      el.style.backgroundColor = 'pink';
      el.style.borderRadius = '20px';
      textArea.value += event.key;
    }
  });

  if (event.keyCode === 8) {
    animationForSpecialBtns(13);
    textArea.value = textArea.value.slice(0, -1);
  } else if (event.keyCode === 13) {
    animationForSpecialBtns(40);
    textArea.value += '\n';
  } else if (event.keyCode === 32) {
    animationForSpecialBtns(57);
    textArea.value += ' ';
  } else if (event.keyCode === 37) {
    animationForSpecialBtns(59);
    textArea.value += '←';
  } else if (event.keyCode === 38) {
    animationForSpecialBtns(52);
    textArea.value += '↑';
  } else if (event.keyCode === 39) {
    animationForSpecialBtns(61);
    textArea.value += '→';
  } else if (event.keyCode === 40) {
    animationForSpecialBtns(60);
    textArea.value += '↓';
  } else if (event.keyCode === 9) {
    animationForSpecialBtns(14);
    textArea.value += '    ';
    event.preventDefault();
  } else if (event.keyCode === 20) {
    animationForSpecialBtns(28);
    handleCapsLock(13, 23);
    handleCapsLock(26, 37);
    handleCapsLock(37, 44);
  }
});

document.addEventListener('keyup', () => {
  document.querySelectorAll('.btn').forEach((el) => {
    el.style.backgroundColor = '';
    el.style.borderRadius = '';
  });
});
