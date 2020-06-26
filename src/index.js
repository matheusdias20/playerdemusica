//let: Declaração de variável que poderão ter seus valores altetados
//const: Declaração da variável com valores que não podem ser alterados, constantes.

let currentSong = 1; // Controla qual música irá tocar
let songsList = []; // Armazena as música dentro de um array




// MANIPULANDO O HTML
//document: Variável global do documento HTML
//querySelector: Métoodo de captura de elementos

const songTitle = document.querySelector("h1");
const uploadFileLabel = document.querySelector("label");
const uploadFileInput = document.querySelector("input");
const player = document.querySelector("audio");
const playButton = document.querySelector("#play");
const stopButton = document.querySelector("#stop");
const previousSongButton = document.querySelector("#prev");
const nextSongButton = document.querySelector("#next");


// Pega e Armazena as músicas em uma variável
function getSelectedSongs(event) {
  songsList = event.target.files;
  uploadFileLabel.style.display = "none";
//Começa a tocar a primeira música
  playSong();
}



function playSong() {
  // Gera uma URL para cada música adicionada para colocar dentro da tag audio do HTML
  const songUrl = URL.createObjectURL(songsList[currentSong - 1]);
  // Por atributo a tag audio precisa de id src, colocando as faixas da música, aqui js faz dinamicamente:
  player.setAttribute("src", songUrl);
  //Pega o H1 = E muda pela música que está sendo tocada
  songTitle.innerText = songsList[currentSong - 1].name;
  // Mudando o ícone de play para pause
  playButton.innerText = "⏸";
  player.play();
  // Ao clicar no botão Play ele tem que mudar o evento para Pause
  playButton.onclick = pauseSong;
}





function pauseSong() {
  // Mudando o ícone de pause para play  
  playButton.innerText = "▶";
  //Pausar a música
  player.pause();

  // Permitir que ao clicar novamente a música volte a tocar no momento em que foi pausada 
  playButton.onclick = continuePlayingSong;
}



// Ao apertar novamente para a musíca tocar, ela precisa voltar no mesmo tempo em que foi pausada
function continuePlayingSong() {
  playButton.innerText = "⏸";
  player.play();

  playButton.onclick = pauseSong;
}




function stopSong() {
  player.pause();
  //Ao apertar o botão Stop ela 0 o tempo da música
  player.currentTime = 0;
  playButton.innerText = "▶";

  playButton.onclick = continuePlayingSong;
}




function nextSong() {
  currentSong = currentSong + 1;

  // Ao atingir o número de musicas selecionas, retorna para a primeira
  if (currentSong > songsList.length) {
    currentSong = 1;
  }

  playSong();
}




function previousSong() {
  currentSong = currentSong - 1;

  // Ao atingir o número de musicas selecionas, retorna para a ultima
  if (currentSong < 1) {
    currentSong = songsList.length;
  }

  playSong();
}


// CRIA OS EVENTOS PARA FUNCIONAR OS BOTÕES
uploadFileInput.onchange = getSelectedSongs; //Seleciona as músicas
stopButton.onclick = stopSong; // Chama a const de stop
nextSongButton.onclick = nextSong;
previousSongButton.onclick = previousSong;

//onclick: Gera um evento caso o usuário clique em um determinado elemento
//onchange: Gera um evento caso o usuário altere o contéudo de um elemento (Nesse caso quando adicionado a música)
