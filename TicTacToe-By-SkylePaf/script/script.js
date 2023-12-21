//------------------------CONNEXION OU ENREGISTREMENT------------------------//

// ===> Défintion du Pseudonyme
let username = prompt("Entrez votre Pseudo")

document.getElementById("1").innerHTML = username

//------------------------FONCTIONS------------------------//

// ===> getRandInt
function getRandomInt(max){
    return Math.floor(Math.random() * max + 1);
}  

// ===> listToCell
function listToCell(nmb1, nmb2, nmb3, color){ //tictactoe[2][1]
    tictactoe[nmb1][nmb2] = nmb3
    coorOfCell = nmb1 * 3 + nmb2
    cellules[coorOfCell].style.backgroundColor = color
    return coorOfCell;
}

// ===> cellToList
function cellToList(nmb1, nmb2, color){
    cellules[nmb1].style.backgroundColor = color
    coOr1 = Math.floor(nmb1/3)
    coOr2 = nmb1 % 3
    tictactoe[coOr1][coOr2] = nmb2
    return;
}

// ===> Randitem
function randomItem(items){
    return items[Math.floor(Math.random()*items.length)];
}

//------------------------VARIABLES------------------------//

// ===> Variables et de constantes
const baliseh4 = document.querySelector("h4");
const baliseh5 = document.querySelector("h5");
const baliseh6 = document.querySelector("h6");
const cellules = document.getElementsByTagName("td");
const restart = document.getElementById("rejouer");
let myH2 = document.getElementById("1");
let myH3 = document.getElementById("2");
let choix_ordi = false;
let audioList = [new Audio("audio/1 WIN_soundeffect.mp3"), new Audio("audio/2 LOOSE_soundeffect.mp3"),
                 new Audio("audio/3 DRAW_soundeffect.mp3"), new Audio("audio/4 RESTART_soundeffect.mp3")]; // Génére une latence
let tictactoe = [[0,0,0],
                 [0,0,0],
                 [0,0,0]];
let endGame = false;
let fakeEndgame = false;
let score_player = 0;
let score_ordi = 0;
let draw = 0;
let num2 = null;
var black = true;         
var num = 0;

//------------------------GUI-MISC-SCORE------------------------//

// ===> Restart // Version plus longue sans utiliser audioList[2] mais sans latence
function playSound() {
        let audio = new Audio("audio/4 RESTART_soundeffect.mp3");
        audio.play();
}
restart.addEventListener("click", playSound)

// ===> GUI_MISC_endGame
function GUI_MISC_endGame(conTexT){
    if (conTexT === "PlayerWin"){
        myH2.style.backgroundImage = "url('https://i.pinimg.com/originals/90/89/b3/9089b3609b6595940092a50f59b027fa.gif')";
        audioList[0].play();
    }
    else if (conTexT === "OrdiWin"){
        myH3.style.backgroundImage = "url('https://i.pinimg.com/originals/90/89/b3/9089b3609b6595940092a50f59b027fa.gif')"
        audioList[1].play();
    }
    else if (conTexT === "DrawEnding"){
        audioList[2].play();
    }
}

// ===> soundTrack
document.addEventListener("click", function() {
    /* A cause de politiques de lecture automatique des navigateurs web on
       est obligé d'intéragir avec la page avnt de lancer l'audio. */
    
    let soundTrack = new Audio("audio/5 OST_soundtrack.mp3");
    soundTrack.loop = true;
    soundTrack.volume = 0.4;
    soundTrack.play();
    
    // Retirer l'écouteur d'événement une fois que la lecture a commencé pour éviter une apocalipse nucléaire
    document.removeEventListener("click", arguments.callee);
})

// ===> savingScore
function savingScore(){
    localStorage.setItem("best_score_player_" + username , score_player)
    localStorage.setItem("best_score_ordi_" + username , score_ordi)
    localStorage.setItem("best_draw_" + username , draw)
}

// ===> bestScoreAct
function bestScoreAct(strScoreOf, scoreOf, numBal, idBal){

    scoreOf++
    if (strScoreOf === "score_player"){score_player++} else if (strScoreOf === "score_ordi"){score_ordi++} else if (strScoreOf === "draw"){draw++}
    if(strScoreOf !== "draw"){numBal.textContent = ''; document.getElementById(idBal).innerHTML = scoreOf}

    if ((strScoreOf === "score_player") && (localStorage.getItem("best_score_player_" + username) - localStorage.getItem("best_score_ordi_" + username) < score_player - score_ordi)){      
        savingScore();
        baliseh6.textContent = '';
        document.getElementById("P5").innerHTML = localStorage.getItem("best_score_player_" + username) + " - " + localStorage.getItem("best_score_ordi_" + username) + " | " +  localStorage.getItem("best_draw_" + username)
    }
    else if (strScoreOf === "draw"){
        localStorage.setItem("best_draw_" + username , draw)
        if (localStorage.getItem("best_score_player_" + username) === null){document.getElementById("P5").innerHTML = score_player + " - " + score_ordi + " | " +  localStorage.getItem("best_draw_" + username)}
        else{document.getElementById("P5").innerHTML = localStorage.getItem("best_score_player_" + username) + " - " + localStorage.getItem("best_score_ordi_" + username) + " | " +  localStorage.getItem("best_draw_" + username)}
    }
}

// ===> Initialisation du Score
if (localStorage.getItem("best_score_player_" + username) === null){savingScore()}

document.getElementById("P5").innerHTML = localStorage.getItem("best_score_player_" + username) + " - " + localStorage.getItem("best_score_ordi_" + username) + " | " +  localStorage.getItem("best_draw_" + username);   // Merci à Kuru Kuru et Unai
document.getElementById("3").innerHTML = score_player;
document.getElementById("4").innerHTML = score_ordi;

//------------------------DÉTECTER_UNE_VICTOIRE------------------------//

function checkWin() {
        for (let i = 0; i < 3; i++) {

                // ===> Vérification de victoire : JOUEUR <--> lignes : horizontales & Verticales 
                if ((tictactoe[i][0] + tictactoe[i][1] + tictactoe[i][2] === 30) || 
                    (tictactoe[0][i] + tictactoe[1][i] + tictactoe[2][i] === 30)) {

                    // Conséquences de la Victoire
                    endGame = true ;
                    GUI_MISC_endGame("PlayerWin");

                    // Mise à jour du Score
                    bestScoreAct("score_player", score_player, baliseh4, "3");
                    return endGame;
                    }

                // ===> Vérification de victoire : JOUEUR <--> lignes : diagonales 
                else if ((tictactoe[0][0] + tictactoe[1][1] + tictactoe[2][2] === 30) || 
                        (tictactoe[0][2] + tictactoe[1][1] + tictactoe[2][0] === 30)) {

                        // Conséquences de la Victoire
                        endGame = true ;
                        GUI_MISC_endGame("PlayerWin");

                        // Mise à jour du Score
                        bestScoreAct("score_player", score_player, baliseh4, "3");
                        return endGame;
                        }
                    
                // ===> Vérification de victoire : ORDINATEUR <--> lignes : horizontales & Verticales
                else if ((tictactoe[i][0] + tictactoe[i][1] + tictactoe[i][2] === 3) || 
                        (tictactoe[0][i] + tictactoe[1][i] + tictactoe[2][i] === 3)) {

                        // Conséquences de la Défaite
                        endGame = true ;
                        GUI_MISC_endGame("OrdiWin")

                        // Mise à jour du Score
                        bestScoreAct("score_ordi", score_ordi, baliseh5, "4");
                        return endGame;
                        }

                // ===> Vérification de victoire : ORDINATEUR <--> lignes : diagonales
                else if ((tictactoe[0][0] + tictactoe[1][1] + tictactoe[2][2] === 3) || 
                        (tictactoe[0][2] + tictactoe[1][1] + tictactoe[2][0] === 3)) {

                        // Conséquences de la Défaite
                        endGame = true ;
                        GUI_MISC_endGame("OrdiWin")
                        
                        // Mise à jour du Score
                        bestScoreAct("score_ordi", score_ordi, baliseh5, "4");
                        return endGame;
                        }

                // ===> Vérification de MATCH-NUL
                else if (num > 4){

                        // Conséquences du Match Nul
                        endGame = true ;
                        GUI_MISC_endGame("DrawEnding")
                        bestScoreAct("draw", draw, null, null)
                        return endGame;
                }
        }
    }

//------------------------DÉTECTER_UNE_POTENTIELLE_VICTOIRE------------------------//

function fakeCheckWin() {
    for (let i = 0; i < 3; i++) {
            // ===> Vérification de victoire : JOUEUR <--> lignes : horizontales & Verticales 
            if ((tictactoe[i][0] + tictactoe[i][1] + tictactoe[i][2] === 29) || 
                (tictactoe[0][i] + tictactoe[1][i] + tictactoe[2][i] === 29)) {
                fakeEndgame = true
                return fakeEndgame;
                }

            // ===> Vérification de victoire : JOUEUR <--> lignes : diagonales 
            else if ((tictactoe[0][0] + tictactoe[1][1] + tictactoe[2][2] === 29) || 
                (tictactoe[0][2] + tictactoe[1][1] + tictactoe[2][0] === 29)) {
                fakeEndgame = true
                return fakeEndgame;
                }
            
            // ===> Vérification de victoire : ORDINATEUR <--> lignes : horizontales & Verticales
            else if ((tictactoe[i][0] + tictactoe[i][1] + tictactoe[i][2] === 3) || 
                (tictactoe[0][i] + tictactoe[1][i] + tictactoe[2][i] === 3)) {
                fakeEndgame = true
                return fakeEndgame;
                }

            // ===> Vérification de victoire : ORDINATEUR <--> lignes : diagonales
            else if ((tictactoe[0][0] + tictactoe[1][1] + tictactoe[2][2] === 3) || 
                (tictactoe[0][2] + tictactoe[1][1] + tictactoe[2][0] === 3)) {
                fakeEndgame = true
                return fakeEndgame;
                }
            }
}

//------------------------MODE_SIMPLE------------------------//

function easyMod(){
    if (num <= 4 && !endGame) {
                    
        // ===> Choix : JOUEUR
        choix_ordi = getRandomInt(8);
        while (cellules[choix_ordi].style.backgroundColor === "black" || cellules[choix_ordi].style.backgroundColor === "green") {
            choix_ordi = getRandomInt(8);
        }
            cellToList(choix_ordi, 1, "green") // assignation de la coordonnée ---> Tableau
}}

//------------------------MODE_MEDIUM------------------------//

function mediumMod(){
    if (num <= 4 && endGame !== true) {
        let winningMove = null;
        let blockingMove = null;

        // ===> Chercher un mouvement gagnant ou de blocage
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tictactoe[i][j] === 0) {
                    // Simuler un mouvement pour voir s'il peut gagner
                    tictactoe[i][j] = 1; // 1 représente l'ordinateur

                    if (fakeCheckWin()) {
                        winningMove = [i, j];
                    }

                    // Réinitialiser le mouvement
                    tictactoe[i][j] = 0;

                    // Simuler un mouvement pour voir s'il peut bloquer le joueur
                    tictactoe[i][j] = 9; // 9 représente le joueur

                    if (fakeCheckWin()) {
                        blockingMove = [i, j];
                    }

                    // Réinitialiser le mouvement
                    tictactoe[i][j] = 0;
                }
            }
        }

        // ===> Si l'ordinateur peut gagner, faites ce mouvement
        if (winningMove) {
            listToCell(winningMove[0], winningMove[1], 1, "green")
        }
        // ===> Si l'ordinateur peut bloquer le joueur, bloquez ce mouvement
        else if (blockingMove) {
            listToCell(blockingMove[0], blockingMove[1], 1, "green")
        }
        // ===> Sinon, choisissez un mouvement aléatoire
        else {
            let emptyCells = [];
            for (let i = 0; i < 9; i++) {
                if (tictactoe[Math.floor(i / 3)][i % 3] === 0) {
                    emptyCells.push(i);
                }
            }
            cellToList(randomItem(emptyCells), 1, "green") // 1 représente l'ordinateur
        }
    }
}

//------------------------MODE_HARDCORE------------------------//

function hardBoiledMod(){
    /* En cours :
            -Algorithme impossible à battre;
               seul seras possible de perdre ou de faire match-nul. */
}

//------------------------LE_JEU------------------------//

function playGame() {

    for (let a = 0; a < cellules.length; a++) { // Pour toutes les Cellules

        cellules[a].addEventListener("click", function () { // ===> Choix : JOUEUR

            // ===> Coordonnées du choix : JOUEUR
            
            if (this.style.backgroundColor !== "black" && this.style.backgroundColor !== "green" && endGame !== true) {

                num++;
                cellToList(a, 10, "black")
                checkWin(); // assignation de la coordonnée ---> Tableau
                mediumMod(); // mettre "easyMod" pour changer la difficultée
                if (endGame !== true){checkWin()} // Vérification de la Victoire : ORDINATEUR / JOUEUR
            }
        })
    }
}
playGame();

//------------------------RESET------------------------//

// ===> Réinitialisation du jeu si : - Victoire - Défaite - Match Nul - Autres
restart.addEventListener('click', function(){

    // Réinitialisation De toutes les Variables
    for (let i = 0; i < cellules.length; i++) {
            cellules[i].style.backgroundColor = '';
        myH2.style.backgroundImage = "none"
        myH3.style.backgroundImage = "none"
        num = 0;
        tictactoe = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        endGame = false
        fakeEndgame = false      
    }
})