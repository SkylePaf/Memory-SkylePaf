var username = null;
let imagesCoords = [];
let firstIMGLoad = false;
let firstIMGIndex = 0;
let firstIMG = new Image();
let otherIMG1 = new Image();
let otherIMG2 = new Image();
let alreadyDone = false;
let startTime;
let countdownTime;
let remainingTime = 0;
let timerInterval;
let loseValue = false;
let startButton;
let IMGDisplay;
let playGround = document.getElementById("playGround")
let grafic = playGround.getContext("2d")
let boxDiv;
let score = 0;
const canvasSurrounding = document.getElementById("img2")
const writeUsername = document.getElementById("username")
const submit = document.getElementById("submit")
const chronometreElement = document.getElementById("chronometreElement")
const bestScoreDisp = document.getElementById("bestScoreDisp")
const ScoreDisp = document.getElementById("ScoreDisp")
const addOrRemove = document.getElementById("t9")

const listOfSounds = [new Audio("sounds/soundEffects/placeHolder.mp3"), new Audio("sounds/soundEffects/submitBut.WAV")]
const listOfSprites = ["models/sprites/1.png", "models/sprites/2.png", "models/sprites/3.png", "models/sprites/4.png", "models/sprites/5.png"]
const listOfMuffedSoundTrack = ["sounds/soundTracks/M-Snowball_Slalom.MP3",
                                "sounds/soundTracks/M-Trampoline_Minigame.MP3",
                                "sounds/soundTracks/M-Rec_Room.MP3",
                                "sounds/soundTracks/M-Owl.MP3",
                                "sounds/soundTracks/M-Luigis_Casino.MP3",
                                "sounds/soundTracks/M-Hide_and_Boo_Seek.MP3",
                                "sounds/soundTracks/M-Bob_omb_VillageCozy_Woods.MP3",
                                "sounds/soundTracks/M-File_Select.MP3",
                                "sounds/soundTracks/M-Koopa_Shell_Ride_0.7_Powerful_Mario.MP3",
                                "sounds/soundTracks/M-Dire,_Dire_Loss_Wigglers_Fortress.MP3",
                                "sounds/soundTracks/M-Crystal_Clouds.MP3",
                                "sounds/soundTracks/M-Cryptic_Hideout.MP3",
                                "sounds/soundTracks/M-Chroma_Tundra.MP3",
                                "sounds/soundTracks/M-Bowsers_Prison.MP3",
                                "sounds/soundTracks/M-Bob-Omb_Battlefield.MP3",
                                "sounds/soundTracks/M-3rd_Floor.MP3"]

const listOfSoundTrack = ["sounds/soundTracks/Snowball_Slalom.mp3",
                          "sounds/soundTracks/Trampoline_Minigame.mp3",
                          "sounds/soundTracks/Rec_Room.mp3",
                          "sounds/soundTracks/Owl.mp3",
                          "sounds/soundTracks/Luigis_Casino.mp3",
                          "sounds/soundTracks/Hide_and_Boo_Seek.mp3",
                          "sounds/soundTracks/Bob_omb_VillageCozy_Woods.mp3",
                          "sounds/soundTracks/File_Select.mp3",
                          "sounds/soundTracks/Koopa_Shell_Ride_0.7_Powerful_Mario.mp3",
                          "sounds/soundTracks/Dire,_Dire_Loss_Wigglers_Fortress.mp3",
                          "sounds/soundTracks/Crystal_Clouds.mp3",
                          "sounds/soundTracks/Cryptic_Hideout.mp3",
                          "sounds/soundTracks/Chroma_Tundra.mp3",
                          "sounds/soundTracks/Bowsers_Prison.mp3",
                          "sounds/soundTracks/Bob-Omb_Battlefield.mp3",
                          "sounds/soundTracks/3rd_Floor.mp3"]

function randint(min, max, step) {
  return min + Math.floor(Math.random() * ((max - min) / step + 1)) * step;
}

ScoreDisp.textContent = "0000"

let firstTrackIndex = randint(0, 15, 1)
let muffedSoundTrack = new Audio()
let currentSoundTrack = new Audio()

function updateScore(adding) {
  score = score + adding
  ScoreDisp.textContent = "0".repeat((ScoreDisp.textContent.length - score.toString().length)) + score.toString();
}

function updateBestScore(){ 
  if (score > localStorage.getItem("best_score_" + username) || localStorage.getItem("best_score_" + username) === "----"){
    localStorage.setItem("best_score_" + username, score)
    bestScoreDisp.textContent = "0".repeat((bestScoreDisp.textContent.length - localStorage.getItem("best_score_" + username).toString().length)) + localStorage.getItem("best_score_" + username).toString()
  } else if (localStorage.getItem("best_score_" + username) === null){
    localStorage.setItem("best_score_" + username, "----")
    bestScoreDisp.textContent = localStorage.getItem("best_score_" + username)
  }
  else(bestScoreDisp.textContent = "0".repeat((bestScoreDisp.textContent.length - localStorage.getItem("best_score_" + username).toString().length)) + localStorage.getItem("best_score_" + username).toString())
}

function timeToString(time) {
  let diffInMin = Math.floor(time / 60000);
  let diffInSec = Math.floor((time % 60000) / 1000);
  let diffInMs = Math.floor((time % 1000) / 10);

  let formattedMM = diffInMin.toString().padStart(2, "0");
  let formattedSS = diffInSec.toString().padStart(2, "0");
  let formattedMS = diffInMs.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function print(txt) {
  chronometreElement.innerHTML = txt;
}

function startTimer() {
  if (!remainingTime) {
      remainingTime = countdownTime;
  }
  timerInterval = setInterval(function () {
      remainingTime -= 10;
      if (remainingTime <= 0) {
        lose()
        clearInterval(timerInterval);
        remainingTime = 0;

      }
      print(timeToString(remainingTime));
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function addTime(seconds) {
  remainingTime += seconds * 1000;
  print(timeToString(remainingTime));
}

function subtractTime(seconds) {
  remainingTime -= seconds * 1000;
  if (remainingTime < 0) {
      remainingTime = 0;
  }
  print(timeToString(remainingTime));
}

countdownTime = 15000;
remainingTime = countdownTime;
print(timeToString(remainingTime));



function logginAnimation(){
  playGround.style.opacity = "0.5";
  canvasSurrounding.style.opacity = "1";
}

function removeSpecialCharacters(input) {
  input.value = input.value.replace(/[^\w\s]/gi, '');
}

function randint(min, max, step) {
  return min + Math.floor(Math.random() * ((max - min) / step + 1)) * step;
}

function randomItem(items, start, end){
  return items[Math.floor(Math.random() * (end - start + 1)) + start]
}

function playNextSoundTrack(followingSound, timeCode = 0){
  if (followingSound !== false){currentSoundTrack.src = followingSound}
  currentSoundTrack.volume = 0.4;
  currentSoundTrack.currentTime = timeCode;
  currentSoundTrack.play();
}

function playSoundEffects(loopToF, audio, vol, startingTimeCode = 0){
  audio.loop = loopToF;
  audio.volume = vol;
  audio.currentTime  = startingTimeCode
  audio.play();
  return audio;
}

document.addEventListener("click", function() {
  muffedSoundTrack.src = listOfMuffedSoundTrack[firstTrackIndex]
  muffedSoundTrack.loop = true
  muffedSoundTrack.volume = 0.4
  muffedSoundTrack.play()
  document.removeEventListener("click", arguments.callee);
})

submit.onclick = function(){ 
  username = writeUsername.value;
  if (username !== '' && username !== undefined && username !== null){
    updateBestScore()
    playSoundEffects(false, listOfSounds[1], 0.1)
    muffedSoundTrack.pause();
    playNextSoundTrack(listOfSoundTrack[firstTrackIndex], muffedSoundTrack.currentTime)
    currentSoundTrack.addEventListener("ended", ()=> {playNextSoundTrack(randomItem(listOfSoundTrack, 0, 5))})
    submit.parentNode.removeChild(submit);
    writeUsername.parentNode.removeChild(writeUsername);
    startButton = document.createElement("button");
    var usernameDisp = document.createElement("usernameDisp");
    var underLine1 = document.createElement("f1");
    var underLine2 = document.createElement("f2");
    var D1 = document.createElement("D1");
    var D2 = document.createElement("D2");
    D1.id = "D1"
    D2.id = "D2"
    D1.textContent = "FIND"
    D2.textContent = "THE"
    startButton.id = "start";
    startButton.type = "button";
    startButton.textContent = "START"
    boxDiv = document.querySelector('.box');
    boxDiv.appendChild(startButton);
    boxDiv.appendChild(D1);
    boxDiv.appendChild(D2);
    setTimeout(function(){D1.style.opacity = "1"; D2.style.opacity = "1"; startButton.style.opacity = "1"}, 1)
    startButton.addEventListener("click", function (){
      updateBestScore()
      let audio = new Audio("sounds/soundEffects/start.wav");  audio.volume = 0.5;audio.play()
      score = 0
      updateScore(0)
      if (alreadyDone === false){
        IMGDisplay = document.createElement("imgDisplay");
        IMGDisplay.id = "imgDisplay";
        boxDiv.appendChild(IMGDisplay);
        setTimeout(function(){IMGDisplay.style.opacity = "1"}, 1)
        alreadyDone = true
      }
      if (loseValue === true){playNextSoundTrack(false, currentSoundTrack.currentTime)}
      loseValue = false;
      clearCanvas(grafic, playGround)
      selectIMGSources()
      generateIMGs(1, firstIMG)
      generateIMGs(30, otherIMG1)
      generateIMGs(30, otherIMG2)
      startTimer()
      startButton.style.pointerEvents = "none"
    })
    usernameDisp.id = "usernameConfirmed";
    boxDiv.appendChild(usernameDisp);
    boxDiv.appendChild(underLine1);
    boxDiv.appendChild(underLine2);
    usernameDisp.classList.add("usernameConfirmed");
    usernameDisp.textContent = username.toUpperCase();
    logginAnimation()
    return username;
  } 
  else{let audio = new Audio("sounds/soundEffects/noUsername.WAV");  audio.volume = 0.5;audio.play()}
}

function xAndyExists(dict, x, y) {
  for (let item of dict) {if (item.x === x && item.y === y) {return true}}
  return false;
}

function selectIMGSources(){
  firstIMGIndex = randint(0, 4, 1)
  firstIMG.src = listOfSprites[firstIMGIndex]
  IMGDisplay.style.backgroundImage = "url(../" + firstIMG.src + ")"
  secondIMGIndex = randint(0, 4, 1)
  while(secondIMGIndex === firstIMGIndex){secondIMGIndex = randint(0, 4, 1)}
  otherIMG1.src = listOfSprites[secondIMGIndex]
  thirdIMGIndex = randint(0, 4, 1)
  while(thirdIMGIndex === firstIMGIndex || thirdIMGIndex === secondIMGIndex){thirdIMGIndex = randint(0, 4, 1)}
  otherIMG2.src = listOfSprites[thirdIMGIndex]
  console.log(firstIMG.src, otherIMG1.src, otherIMG2.src)
}

function clearCanvas(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function generateIMGs(nmb, img) {
  img.onload = () => {
    for (let i = 0; i < nmb; i++) {
      let x;
      let y;
      do {x = randint(30, 470, 50); y = randint(30, 470, 50)} while (xAndyExists(imagesCoords, x, y));
      if (img === firstIMG){firstIMG.style.zIndex = "-1"}
      grafic.drawImage(img, x, y, 100, 100);
      imagesCoords.push({ x: x, y: y, width: 100, height: 100, source: img.src});
    }
  }
}

function lose(){
  currentSoundTrack.pause()
  let audio = new Audio("sounds/soundEffects/lose.WAV");  audio.volume = 0.8; audio.play();
  startButton.onclick = () => {audio.pause()}
  loseValue = true
  clearCanvas(grafic, playGround)
  grafic.drawImage(firstIMG, imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.x), imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.y), imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.width), imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.height))
  imagesCoords = []
  startButton.style.pointerEvents = "auto";
}

playGround.onclick = (event) => {
  if(loseValue !== true && alreadyDone === true){
    var mouseX = event.clientX - playGround.getBoundingClientRect().left;
    var mouseY = event.clientY - playGround.getBoundingClientRect().top;
    if (mouseX >= imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.x) && mouseX <= imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.x) + imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.width) &&
      mouseY >= imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.y) && mouseY <= imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.y) + imagesCoords.filter(obj => obj.source === firstIMG.src).map(obj => obj.height)) {
      let audio = new Audio("sounds/soundEffects/goodAnswer.WAV"); audio.volume = 0.5; audio.play()
      addOrRemove.textContent = "+3"
      addOrRemove.style.opacity = "1"
      setTimeout(function(){addOrRemove.style.opacity = "0"}, 300)
      
      updateScore(1)
      addTime(3)
      selectIMGSources()
      clearCanvas(grafic, playGround)
      imagesCoords = []
      generateIMGs(1, firstIMG)
      generateIMGs(30, otherIMG1)
      generateIMGs(30, otherIMG2)
    }
    else{
      addOrRemove.textContent = "-3"
      addOrRemove.style.opacity = "1"
      setTimeout(function(){addOrRemove.style.opacity = "0"}, 300)
      subtractTime(3); let audio = new Audio("sounds/soundEffects/miss.WAV"); audio.volume = 0.5; audio.play()}
  }
}