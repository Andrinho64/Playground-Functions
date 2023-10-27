const menu = require('./mcDonalds');
const guestsDatabase = require('./data.json');

// =================================================
// PARTE 1
// =================================================

// Requisito 1 - Crie uma função que divida uma frase

function splitSentence(palavras) {
  return palavras.split(' ');
}
console.log(splitSentence('go Trybe'));
console.log(splitSentence('vamo que vamo'));
console.log(splitSentence('foguete'));

// Requisito 2 - Crie uma função que calcula a quantidade de pontos em um campeonato de futebol

function footballPoints(wins, ties) {
  return wins * 3 + ties;
}
console.log(footballPoints(14, 8));
console.log(footballPoints(1, 2));
console.log(footballPoints(0, 0));

// Requisito 3 - Crie uma função que adiciona músicas em uma playlist

let playlist = [];
function addMusics(artistName, musicName, musicTime) {
  const objMusic = {
    artist: artistName,
    music: musicName,
    musicTime,
  };

  playlist.push(objMusic);
  return playlist;
}

// =================================================
// PARTE 2
// =================================================
// Requisito 4 - Crie uma função que retorna o produto mais caro de acordo com uma categoria

function moreExpensive(data, category) {
  let produtoMaisCaro;
  const products = data[category];
  for (let index = 0; index < products.length; index += 1) {
    const produtoAtual = products[index];
    if (typeof produtoMaisCaro === 'undefined' || produtoAtual.price >= produtoMaisCaro.price) {
      produtoMaisCaro = produtoAtual;
    }
  }
  return `O produto mais caro é: ${produtoMaisCaro.name}, que custa: R$${produtoMaisCaro.price.toFixed(2)}.`;
}
// Requisito 5 - Crie uma função que verifica se um determinado item já existe

function checkItem(data, category, item) {
  let verificar;
  let numDeObjetos = data[category].length;
  for (let index = 0; index < numDeObjetos; index += 1) {
    let search = Object.values(data[category][index]);
    if (search[0] === item) {
      return true;
    } verificar = false;
  }
  if (verificar === false) {
    return false;
  }
}

// Requisito 6 - Crie uma função que adiciona um novo item caso ele ainda não exista

function addNewItem(data, category, item, price, ingredients, calories) {
  let resultado;
  if (checkItem(data, category, item) === true) {
    resultado = `O produto: "${item}" já existe!`;
  } else {
    resultado = { name: item, price, ingredients, calories };
    data[category].push(resultado);
  }

  return resultado;
}

// Requisito 7 - Crie uma função que conta a quantidade de pessoas por gênero

function counterGender(data) {
  let resultado = {};
  let qtdHomens = 0;
  let qtdMulheres = 0;

  for (let index = 0; index < data.guests.length; index += 1) {
    let type = Object.values(data.guests[index]);

    if (type[6] === 'male') {
      qtdHomens += 1;
      resultado.male = qtdHomens;
    } else {
      qtdMulheres += 1;
      resultado.female = qtdMulheres;
    }
  }
  return resultado;
}

// =================================================
// PARTE 3
// =================================================

// Requisito 8 - Crie uma função que retorna os elementos de um determinado estado

function filterState(data, state) {
  let resultado = [];
  for (let index = 0; index < data.guests.length; index += 1) {
    if (guestsDatabase.guests[index].address.state === state) {
      resultado.push(guestsDatabase.guests[index]);
    }
  }
  return resultado;
}

// Requisito 9 - Crie uma função que altera a propriedade `picture`

function changePicture(data, link) {
  let array = [];

  for (let index = 0; index < data.guests.length; index += 1) {
    data.guests[index].picture = link;
    array.push(data.guests[index]);
  }
  return array;
}

// Requisito 10 - Crie um função que gera um relatório

function generateReport(data) {
  const report = {
    totalGuests: data.guests.length,
    totalGender: {
      male: 0,
      female: 0,
    },
    avgAge: 0,
    countries: [],
  };
  let totalAvgAge = 0;
  for (let i = 0; i < data.guests.length; i += 1) {
    const guest = data.guests[i];
    if (guest.gender === 'male') {
      report.totalGender.male += 1;
    } else {
      report.totalGender.female += 1;
    }
    totalAvgAge += guest.age;
    if (!report.countries.includes(guest.country)) report.countries.push(guest.country);
    report.countries.sort();
  }
  report.totalGender = { male: report.totalGender.male, female: report.totalGender.female };
  report.avgAge = Number((totalAvgAge / report.totalGuests).toFixed(2));

  return report;
}

// Não modifique as linhas abaixo
module.exports = {
  splitSentence: typeof splitSentence === 'function' ? splitSentence : (() => { }),
  footballPoints: typeof footballPoints === 'function' ? footballPoints : (() => { }),
  addMusics: typeof addMusics === 'function' ? addMusics : (() => { }),
  playlist: typeof playlist === 'undefined' ? [] : playlist,
  moreExpensive: typeof moreExpensive === 'function' ? moreExpensive : (() => { }),
  checkItem: typeof checkItem === 'function' ? checkItem : (() => { }),
  addNewItem: typeof addNewItem === 'function' ? addNewItem : (() => { }),
  counterGender: typeof counterGender === 'function' ? counterGender : (() => { }),
  filterState: typeof filterState === 'function' ? filterState : (() => { }),
  changePicture: typeof changePicture === 'function' ? changePicture : (() => { }),
  generateReport: typeof generateReport === 'function' ? generateReport : (() => { }),
};
