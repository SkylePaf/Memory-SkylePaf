/**
let bouton = document.getElementsByTagName("button")[0]
let bouton_retablir = document.getElementsByTagName("button")[1]
let titre = document.getElementsByTagName("h1")[0]

bouton.addEventListener("click", function(){
    titre.style.color = "rgba(150, 200, 30, 0.5)"
})

bouton_retablir.addEventListener("click", function(){
    titre.style.color = "red"
})
*/

/** 
Toutes les balises td sont dans un tableau
dans l'ordre de l'affichage du fichier HTML.
indices : 0, 1, 2, ....., 8
*/
let cellules = document.getElementsByTagName("td")

/**
cellules[3].style.backgroundColor = "rgba(100, 120, 30, 0.2)"
*/
black = true

for(let i=0; i<cellules.length; i++){    
    
            cellules[i].addEventListener("click", function(){
                if(black == true){
                        this.style.backgroundColor = "black"
                        black = false
                }else{
                        this.style.backgroundColor = "green"  
                        black = true
                }    
        })
}












