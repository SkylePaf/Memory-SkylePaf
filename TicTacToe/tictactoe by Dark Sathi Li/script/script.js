let cellules = document.getElementsByTagName("td")

let couleur = true
let couleur1 = 'rgba(224, 9, 41, 0.778)'
let couleur2 = 'rgba(23, 34, 230, 0.8)'

for (let i = 0; i < cellules.length; i++) {

        cellules[i].addEventListener("click", function () {

                if (this.style.backgroundColor != couleur1 && this.style.backgroundColor != couleur2 ) {

                        if (couleur == true) {
                                this.style.backgroundColor = couleur1
                                couleur = false
                        } else {
                                this.style.backgroundColor = couleur2
                                couleur = true
                        }
                }
        })
}

let button = document.getElementById('rejouer')

button.addEventListener('click', function(){
        for (let i = 0; i < cellules.length; i++) {
                cellules[i].style.backgroundColor = ''
        }
})

















