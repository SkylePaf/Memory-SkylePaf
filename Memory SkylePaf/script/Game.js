//------------------------VARIABLES & CONSTANTES------------------------//

// ===> Constantes
const missStreakDiplay = document.getElementById("3");
const missStreakNum = document.getElementById("4");
const cellules = document.getElementsByTagName("td");
const chronometreElement = document.getElementById("2");
const restart = document.getElementById("Restart");
const memoryDisplay = document.getElementById("memory");
const listOfSoundTrack = [new Audio("audio/7_OST_1.mp3"), new Audio("audio/8_OST_2.mp3"), new Audio("audio/9_OST_3.mp3")]
const listOfSounds = [new Audio("audio/1_Restart.wav"), new Audio("audio/3_Win.wav"),
                      new Audio("audio/4_Badeffect.wav"), new Audio("audio/11_Help_appears.wav"),
                      new Audio("audio/6_Alternative_Right_Answer.wav"), new Audio("audio/5_Wrong_Answer.wav"),
                      new Audio("audio/12_Help_disappears.wav"), new Audio("audio/13_GoodEffect-1.wav")]
const listOfRightAnswerSounds = [new Audio("audio/2_Right_Answer_1.wav"), new Audio("audio/2_Right_Answer_2.wav"),
                                 new Audio("audio/2_Right_Answer_3.wav"), new Audio("audio/2_Right_Answer_4.wav"),
                                 new Audio("audio/2_Right_Answer_5.wav"), new Audio("audio/2_Right_Answer_6.wav"),
                                 new Audio("audio/2_Right_Answer_7.wav"), new Audio("audio/2_Right_Answer_8.wav")]

// ===> Variables
var angle = 0;
var rotationInterval;
var isBadEffect2 = false;

let Memory = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let extraMemory = [9, 9, 10, 10, 11, 11, 12, 12];
let Images = ["url(images/BOW.png)", "url(images/Sword.png)", "url(images/Sword.png)"];
let Colors = ["#fa9e00", "#e310dc", "#a8f0b5", "#85001b", "#ff0000", "#002aff", "#003d0c", "#013552"];
let extraColors = ["#631c63", "#2b1c63", "#ffffff", "#000000"];
let dicoMemory = {};
let extraDicoMemory = {};
let extraCell = [];
let nmb2 = 0;
let nmb1 = 0;
let tries = 0;
let moveCoOr = [];
let moveCoOr2 = [];
let Point = 0;
let clickCount = 0;
let clickCount2 = 0;
let randomVar = 0;
let minutes = 0;
let secondes = 0;
let rightAnswers = 0;
let misses = 0;
let millisecondes = 0;
let timer;
let isRunning = false;
let missStreak = 0;
let winStreak = 0;
let missStreakDisp = false;
let isBadEffect = false;
let isGoodEffect = false
let rightAnswerNmb = 0;
let soundTrack;
let endGame = false;
let wonExra = false;
let rightCells = 0;
let elementCoOrds = [];

//------------------------FONCTIONS------------------------//

// ===> rightAnswer() --> pour regarder si l'on a un couple de couleur
function rightAnswer(wichMemory, movementCoOr){
  if (wichMemory[movementCoOr[0]][movementCoOr[1]] === wichMemory[movementCoOr[2]][movementCoOr[3]]){
    if (isBadEffect === true){missStreakNum.textContent = missStreak}
    return true;
  }
}

// ===> Randitem
function randomItem(items){
  return items[Math.floor(Math.random()*items.length)];
}

function coOrdsFinder(element) {
  elementCoOrds = [];
  for (let j = 0; j < 4; j++){
    for (let d = 0; d < 4; d++){
      if (dividedMemory[j][d] === element){
        elementCoOrds.push(j, d)
      }
    }
  }
  return elementCoOrds;
}

document.addEventListener("click", function() {
  
  let soundTrack = randomItem(listOfSoundTrack);
  soundTrack.volume = 0.2;
  soundTrack.loop = true;
  soundTrack.play();
  document.removeEventListener("click", arguments.callee);
})

// ===> Restart // Version plus longue sans utiliser audioList[2] mais sans latence
function playSound() {
  if (isBadEffect === false || endGame === true){ 
    let audio = new Audio("audio/1_Restart.wav");
    audio.play();
  }
  else{
  let audio = new Audio("audio/10_Cant_Restart.wav");
  audio.play();
  }
}
restart.addEventListener("click", playSound)

// ===> chesckWin() --> pour regarder si l'on a finis la ou les tables
function checkWin(){
  randomVar = 0
  rightCells = 0
  for(let e = 0; e < cellules.length; e++){
    if (cellules[e].style.backgroundColor === ""){randomVar++}
  }
  for(let e = 0; e < extraCell.length; e++){
    if (extraCell[e].style.backgroundColor === ""){randomVar++}
    else{rightCells++}
  }
  if(randomVar === 0){
    listOfSounds[1].play()
    endGame = true;
    stopTimer();
  } 
  if (rightCells === 8 && wonExra === false && endGame === false){ExtraPlayGameFinished(); wonExra = true}
}

// ===> cellToList --> convertir de cellules en liste
function cellToList(wichMemory, nmb4, nmb3, interval1, interval2, dico, cell, movementCoOr){
  if (wichMemory === dividedMemory){nmb1++}
  else if (wichMemory === dividedExtraMemory){nmb2++}
  coOr1 = Math.floor(nmb4/nmb3)
  coOr2 = nmb4 % nmb3
  for (let i = interval1; i < interval2; i++){
    if (wichMemory[coOr1][coOr2] === i){
      cell[coOr1 * nmb3 + coOr2].style.backgroundColor = dico[i]
      movementCoOr.push(coOr1, coOr2)
    }
  }
}

// ===> WinConsequences() --> consequences d'une bonne réponse
function WinConsequences(wichMemory, movementCoOr){
  Point++
  if (wichMemory === dividedMemory){nmb1 = 0; clickCount = 0}
  else if (wichMemory === dividedExtraMemory){nmb2 = 0; clickCount2 = 0}
  missStreak = 0
  movementCoOr.splice(0, movementCoOr.length)
}

// ===> LooseConsequences() --> consequences d'une mauvaise réponse
function LooseConsequences(wichMemory, cell, num, movementCoOr){
  setTimeout(function(){
    cell[movementCoOr[0] * num + movementCoOr[1]].style.backgroundColor = ""
    cell[movementCoOr[2] * num + movementCoOr[3]].style.backgroundColor = ""
    movementCoOr.splice(0, movementCoOr.length);
    misses++;
    if (wichMemory === dividedMemory){nmb1 = 0; clickCount = 0}
    else if (wichMemory === dividedExtraMemory){nmb2 = 0; clickCount2 = 0}
    missStreak++
    if (isBadEffect === true){missStreakNum.textContent = missStreak; badEffect2()}
    else {badEffect1()}
  }, 500);
}
// ===> shuffleArray() --> mélanger un array
function shuffleArray(array) {

    function getRandom() {
      return Math.random() - 0.5;
    }
    array.sort(getRandom);
}

// ===> chunkArray() --> diviser une liste en plusieurs
function chunkArray(array, chunkSize) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

//------------------------CHRONOMETRE------------------------//

// ===> initialisation
chronometreElement.textContent = "00:00:00"

// ===> startTimer() --> pour démarrer le chronomètre
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 10);
  }
}

// ===> stopTimer() --> pour arréter le chronomètre 
function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

// ===> resetTimer() --> pour réinitialiser le chronomètre
function resetTimer() {
  stopTimer();
  minutes = 0;
  secondes = 0;
  millisecondes = 0;
  updateDisplay();
}

// ===> updateTimer() --> pour rafréchir le chronomètre
function updateTimer() {
  millisecondes += 10;

  if (millisecondes === 1000) {
    millisecondes = 0;
    secondes++;

    if (secondes === 60) {
      secondes = 0;
      minutes++;
    }
  }
  updateDisplay();
}

// ===> updateDisplay() --> pour afficher le chronométre
function updateDisplay() {
  chronometreElement.textContent = formatTime(minutes) + ":" + formatTime(secondes) + ":" + formatTime(millisecondes / 10);
}

// ===> fomatTime() --> pour passer à la minute/seconde
function formatTime(value) {
  return value < 10 ? "0" + value : value;
}

//------------------------LE JEU------------------------//

// ===> mapGenerator() --> génère une map aléatoirement
function mapGenerator(ofWhat, nmb1){
  shuffleArray(ofWhat)
  if (ofWhat === Memory){dividedMemory = chunkArray(ofWhat, nmb1)}
  else (dividedExtraMemory = chunkArray(ofWhat, nmb1))
  return
}
mapGenerator(Memory, 4);

// ===> définir les dictionnaires
for (let i = 1; i < 9; i++) {
  dicoMemory[i] = Colors[i-1];
}
for (let i = 9; i < 13; i++) {
  extraDicoMemory[i] = extraColors[i-9];
}

// ===> playGame() --> Memory : PRINCIPALE
function playGame() {
  for (let a = 0; a < cellules.length; a++) {
    cellules[a].addEventListener("click", function () {
      if (cellules[a].style.backgroundColor === ""){
        tries++;
        startTimer();
        clickCount++
        if(clickCount < 3){
          cellToList(dividedMemory, a, 4, 1, 9, dicoMemory, cellules, moveCoOr);
          if (nmb1 === 2){
            if (rightAnswer(dividedMemory, moveCoOr)){
              WinConsequences(dividedMemory, moveCoOr)
              rightAnswers++;
              rightAnswerNmb++;
              winStreak++;
              goodEffect()
              listOfRightAnswerSounds[rightAnswerNmb-1].play();
              checkWin();
              if (missStreakDisp === true){missStreakNum.textContent = missStreak}
            }
            else{
              LooseConsequences(dividedMemory,cellules , 4, moveCoOr);
              let audio = new Audio("audio/5_Wrong_Answer.wav");
              audio.play();
              winStreak = 0
            }
          }
        }
      }
    })
  }
}

// ===> playGame() --> Memory : BADEFFECT
function ExtraPlayGame() {
  for (let a = 0; a < extraCell.length; a++) {
    extraCell[a].addEventListener("click", function () {
      if (extraCell[a].style.backgroundColor === ""){
        startTimer();
        clickCount2++
        if(clickCount2 < 3){
          cellToList(dividedExtraMemory, a, 2, 9, 13, extraDicoMemory, extraCell, moveCoOr2)
          if (nmb2 === 2){
            if (rightAnswer(dividedExtraMemory, moveCoOr2)){
              let audio = new Audio("audio/6_Alternative_Right_Answer.wav");
              audio.play();
              WinConsequences(dividedExtraMemory, moveCoOr2);
              checkWin();
            } 
            else{
              LooseConsequences(dividedExtraMemory,extraCell , 2, moveCoOr2)
              let audio = new Audio("audio/5_Wrong_Answer.wav");
              audio.play();
            }
          }
        }
      }
    })
  }
}

function goodEffect(){
  if (rightAnswers <= 6 && winStreak === 3 && isGoodEffect === false && tries / 2 <= 10){
    for (let l = 0; l < 2; l++) {
      for (let o = 1; o < 9; o++) {
        coOrdsFinder(o)

        if ((cellules[elementCoOrds[0] * 4 + elementCoOrds[1]].style.backgroundColor === "") && 
            (cellules[elementCoOrds[2] * 4 + elementCoOrds[3]].style.backgroundColor === "")){
          cellules[elementCoOrds[2] * 4 + elementCoOrds[3]].style.backgroundColor = "transparent";
          cellules[elementCoOrds[0] * 4 + elementCoOrds[1]].style.backgroundColor = "transparent";
          cellules[elementCoOrds[2] * 4 + elementCoOrds[3]].style.borderColor = "transparent";
          cellules[elementCoOrds[0] * 4 + elementCoOrds[1]].style.borderColor = "transparent";
          cellules[elementCoOrds[2] * 4 + elementCoOrds[3]].style.boxShadow = "transparent 0px 0px 10px";
          cellules[elementCoOrds[0] * 4 + elementCoOrds[1]].style.boxShadow = "transparent 0px 0px 10px";
          break;
        }
      }
    }
    isGoodEffect = true;
    listOfSounds[7].play()
  }
}

function ExtraPlayGameFinished() {
  for (let m = 0; m < 16; m++) {
    if (cellules[m].style.backgroundColor !== "transparent"){
      cOor1 = Math.floor(m / 4);
      cOor2 = m % 4;
      cellules[m].style.borderColor = dicoMemory[dividedMemory[cOor1][cOor2]];
    }
  }
  listOfSounds[6].play()
  setTimeout(function() {
    for (let o = 0; o < 16; o++) {
      if (cellules[o].style.backgroundColor !== "transparent"){cellules[o].style.borderColor = "white"}
      else(cellules[o].style.borderColor = "white")
    }
    listOfSounds[3].play()
  }, 2500);
}

playGame()

//------------------------LE JEU------------------------//

restart.addEventListener('click', function(){
  if (isBadEffect === false || endGame === true){
    moveCoOr.splice(0, moveCoOr.length);
    moveCoOr2.splice(0, moveCoOr2.length);
    nmb1 = 0;
    nmb2 = 0;
    tries = 0;
    missStreak = 0;
    winStreak = 0;
    rightAnswers = 0;
    misses = 0;
    endGame = false;
    clickCount = 0;
    clickCount2 = 0;
    missStreakDisp = false;
    isBadEffect = false;
    isBadEffect2 = false;
    wonExra = false;
    isGoodEffect = false;
    angle = 0;
    rotationInterval = null;
    missStreakNum.textContent = "";
    dividedMemory = [];
    dividedExtraMemory = [];
    rightAnswerNmb = 0;
    memoryDisplay.style.transform = 'rotate(0deg)'
    for(let p = 0; p < cellules.length; p++){
      cellules[p].style.backgroundColor = "";
      cellules[p].style.borderColor = "";
      cellules[p].style.boxShadow = "";
    }
    for(let p = 0; p < extraCell; p++){
      extraCell[p].style.backgroundColor = "";
    }
    extraCell = []
    removeTable();
    mapGenerator(Memory, 4);
    mapGenerator(extraMemory, 2);
    resetTimer();
  }
})