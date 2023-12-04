//------------------------BAD EFFECT 1------------------------//

// ===> extraTable() --> rajoute 8 cases du au Badeffect1
function extraTable () {
  var table = document.createElement("table");
  table.id = "memoryplus";
  table.style.position = "absolute";
  table.style.left = "400px";
  table.style.bottom = "20px";
  table.style.width = "175px"
  table.style.borderColor = "rgb(254, 121, 0)";
  table.style.boxShadow = "#ff5e00 0px 0px 10px";

  for (var i = 0; i < 4; i++) {
      var row = table.insertRow(i);
      for (var j = 0; j < 2; j++) {
          var cell = row.insertCell(j);
          cell.style.border = "solid rgb(254, 121, 0)"
          extraCell.push(cell);
      }
  }
  var boxDiv = document.querySelector('.box');
  boxDiv.appendChild(table);
  missStreakDiplay.style.border = "rgb(254, 121, 0) solid"
  missStreakDiplay.style.boxShadow = "#ff5e00 0px 0px 10px"
  missStreakDiplay.style.backgroundColor = "rgba(255, 234, 0, 0.10)"
  missStreakNum.style.border = "rgb(254, 121, 0) solid"
  missStreakNum.style.boxShadow = "#ff5e00 0px 0px 10px"
  missStreakDiplay.textContent = "Miss Streak"
  missStreakNum.textContent = missStreak
  missStreakDisp = true
  mapGenerator(extraMemory, 2);
  return { boxDiv, extraCell, missStreakDisp};
}

// ===> animateTable() --> l'animation d'entrée de extraTable()
function animateTable() {
var table = document.getElementById("memoryplus");

var startPosition = -360;
var endPosition = 20;
var duration = 1000;
var startTime;

function animate(currentTime) {
  if (!startTime) startTime = currentTime;

  var elapsedTime = currentTime - startTime;
  var progress = Math.min(elapsedTime / duration, 1);
  var newPosition = startPosition + (endPosition - startPosition) * progress;

  if (table) {
    table.style.bottom = newPosition + "px";
  }

  if (elapsedTime < duration && table) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
}

// ===> removeTable() --> pour retirer extraTable()
function removeTable() {
var tableToRemove = document.getElementById("memoryplus");
if (tableToRemove) {
  tableToRemove.remove();
  missStreakDiplay.style.border = "transparent solid";
  missStreakDiplay.style.boxShadow = "transparent 0px 0px 10px";
  missStreakDiplay.style.backgroundColor = "transparent";
  missStreakNum.style.border = "transparent solid";
  missStreakNum.style.boxShadow = "transparent 0px 0px 10px";
  missStreakDiplay.textContent = "";
}
} 

// ===> badEffect1() --> le Premier malus qui rajoute 8 cases
function badEffect1(){
if (missStreak === 5){
  listOfSounds[2].play()
  isBadEffect = true;
  extraTable();
  animateTable();
  ExtraPlayGame();
  return isBadEffect;
}
}

function badEffect2(){
if (isBadEffect2 === false && misses === 10){rotationInterval = setInterval(rotateObject, 10); isBadEffect2 = true}
}

function rotateObject() {
angle += 1;
memoryDisplay.style.transform = 'rotate(' + angle + 'deg)';

if (angle >= 180) {
  clearInterval(rotationInterval);
}
}