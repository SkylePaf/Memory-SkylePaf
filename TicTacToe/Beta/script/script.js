function getRandomInt(max){
  return Math.floor(Math.random() * max + 1);
}

let cellules = document.getElementsByTagName("td")
let choix_ordi = false
let tictactoe = [[0,0,0],[0,0,0],[0,0,0]]
black = true
num = 0

function win(){
    
}

for(let i=0; i<cellules.length; i++){    
    
            cellules[i].addEventListener("click", function(){
                
                let quotient = Math.floor(i/3)
                let reste = i%3
                
                if (this.style.backgroundColor != "black" && this.style.backgroundColor != "green") {
                    this.style.backgroundColor = "black"
                    num ++
                    tictactoe[quotient][reste] = 10
                    if(num <= 4){choix_ordi = getRandomInt(8)
                    while(cellules[choix_ordi].style.backgroundColor == "black" || cellules[choix_ordi].style.backgroundColor == "green"){
                    choix_ordi = getRandomInt(8)
                }
                    cellules[choix_ordi].style.backgroundColor = "green"
                    tictactoe[Math.floor(choix_ordi/3)][choix_ordi%3] = 3
                    
                }}
        })
}


let button = document.getElementById('rejouer')

button.addEventListener('click', function(){
        for (let i = 0; i < cellules.length; i++) {
                cellules[i].style.backgroundColor = ''
        num = 0
        }
})