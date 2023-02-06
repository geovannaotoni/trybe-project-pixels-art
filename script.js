// Requisito 4 - Função para gerar cor aleatória
// Função que gera a cor aleatória em hexadecimal (Inspirado no artigo https://horadecodar.com.br/2022/01/16/gerar-cor-aleatoria-com-javascript/)
// Função Math.random()*16 : gera um número decimal aleatorio entre 0 e 16
// Função Math.floor : arrendonda o número para cima (para um inteiro)
const generateColor = () => {
  const characters = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += characters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Requisito 2 - Adicionar paleta de cores
// Função que cria as divs
const createDivColor = (color) => {
  const colorPalette = document.getElementById('color-palette');
  const divColor = document.createElement('div');
  divColor.classList.add('color');
  divColor.style.backgroundColor = color;
  colorPalette.appendChild(divColor);

  // Requisito 8 - Cor preta como cor inicial da paleta
  if (color === 'black') {
    divColor.classList.add('selected');
  }
};

// Requisito 3 - A primeira cor da paleta deve ser preta
createDivColor('black');
// Requisito 4 - Demais cores geradas aleatoriamente
for (let index = 1; index <= 3; index += 1) {
  createDivColor(generateColor());
}

// Requisito 4 - Botão para gerar cores aleatórias para a paleta de cores
const generateColorButton = document.getElementById('button-random-color');
const inputColor = () => {
  const divColor = document.getElementsByClassName('color');
  for (let index = 1; index < divColor.length; index += 1) {
    divColor[index].style.backgroundColor = generateColor();
  }

  // Requisito 5 - Salvar as cores geradas no localStorage
  const colorPalette = {
    1: divColor[1].style.backgroundColor,
    2: divColor[2].style.backgroundColor,
    3: divColor[3].style.backgroundColor,
  };
  localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
};

generateColorButton.addEventListener('click', inputColor);

// Requisito 5 - Função para recuperar as cores salvas no localStorage após recarregar a página
const restorePalette = () => {
  const divColor = document.getElementsByClassName('color');
  const colorPalette = JSON.parse(localStorage.getItem('colorPalette'));
  if (colorPalette) {
    for (let index = 1; index < divColor.length; index += 1) {
      divColor[index].style.backgroundColor = colorPalette[index];
    }
  }
};

// Requisito 6 - Adicione à página um quadro com 25 pixels
const addPixelBoard = (number) => {
  const pixelBoard = document.getElementById('pixel-board');
  for (let index = 0; index < number; index += 1) {
    const pixelLine = document.createElement('div');
    pixelLine.classList.add('line');
    pixelBoard.appendChild(pixelLine);
    for (let indexAux = 0; indexAux < number; indexAux += 1) {
      const pixelItem = document.createElement('div');
      pixelItem.classList.add('pixel');
      pixelLine.appendChild(pixelItem);
    }
  }
};
addPixelBoard(5);

// Requisito 9 - Função para selecionar uma cor na paleta
const selectColor = (event) => {
  const selectedColor = document.getElementsByClassName('selected')[0];
  selectedColor.classList.remove('selected');
  event.target.classList.add('selected');
};

const divColor = document.getElementsByClassName('color');
for (let index = 0; index < divColor.length; index += 1) {
  divColor[index].addEventListener('click', selectColor);
}

// Requisito 12 - salvar e recuperar o histórico do desenho
// Função para salvar a cor de cada pixel no localStorage
const saveDraw = () => {
  const pixels = document.getElementsByClassName('pixel');
  const pixelBoard = {};
  for (let index = 0; index < pixels.length; index += 1) {
    pixelBoard[index] = pixels[index].style.backgroundColor;
    if (pixelBoard[index] === '') {
      pixelBoard[index] = 'white';
    }
  }
  localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard));
};

// Função para restaurar a cor de cada pixel do localStorage
const restoreDraw = () => {
  const pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
  const pixels = document.getElementsByClassName('pixel');
  if (pixelBoard) {
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = pixelBoard[index];
    }
  }
};

// Requisito 10 - Função para preencher o pixel do quadro com a cor selecionada
const paintPixel = () => {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', (event) => {
      const selectedColor = document.getElementsByClassName('selected')[0].style.backgroundColor;
      const pixelToPaint = event.target;
      pixelToPaint.style.backgroundColor = selectedColor;
      // Requisito 12
      saveDraw();
    });
  }
};
paintPixel();

// Requisito 11 - Botão para retornar a cor do quadro para a cor inicial
const resetBoard = () => {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
  saveDraw(); // inclui aqui para também salvar se a pessa resetar e sair da página
};
const resetButton = document.getElementById('clear-board');
resetButton.addEventListener('click', resetBoard);

// Requisitos Bônus
const input = document.getElementById('board-size');
const generateBoardButton = document.getElementById('generate-board');
const pixelBoard = document.getElementById('pixel-board');

// Requisito 15 - Função para manter o tamanho do novo board ao recarregar a página
const saveSize = () => {
  localStorage.setItem('boardSize', JSON.stringify(input.value));
};

const restoreSize = () => {
  const number = JSON.parse(localStorage.getItem('boardSize'));
  if (number) {
    pixelBoard.innerHTML = '';
    addPixelBoard(number);
  }
};

// Requisito 13 - Função para selecionar um tamanho para o quadro de pixels
// Requisito 14 - Limita o tamanho do quadro para estar entre 5 e 50 pixels
const inputNumber = () => {
  localStorage.removeItem('pixelBoard');
  if (input.value.length === 0) {
    window.alert('Board inválido!');
  }
  if (input.value < 5) {
    pixelBoard.innerHTML = '';
    addPixelBoard(5);
    paintPixel();
  } else if (input.value > 50) {
    pixelBoard.innerHTML = '';
    addPixelBoard(50);
    paintPixel();
  } else {
    pixelBoard.innerHTML = '';
    addPixelBoard(input.value);
    paintPixel();
  }
  saveSize();
};
generateBoardButton.addEventListener('click', inputNumber);

// Utilizar window.onload para restaurar todas as alterações feitas
window.onload = () => {
  restorePalette();
  restoreSize();
  restoreDraw();
};