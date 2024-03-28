// class App {
//     constructor(){

//     }

// }

// const app = newApp();

// const filterImg = document.querySelectorAll(".filter img");
// // Sélection de la liste ul
// const filterUl = document.querySelectorAll(".filter ul");
// const filterbar = document.querySelectorAll(".dropdown-toggle");
// // Ajout d'un gestionnaire d'événements au clic sur l'image

// filterbar.forEach((filterbar) => {
//   filterbar.addEventListener("click", (e) => {
//     // Ajout de la classe active à la liste ul
//     filterUl.forEach((filterul) => {
//     if (!filterul.classList.contains("show")) {
//       // Appliquer le style à l'image lorsque la liste ul a la classe active
//       filterImg.forEach(filterImg => {
//         filterImg.style.transform = "rotateY(180deg)";
//       });
    
//     } else {
//       // Supprimer le style si la liste ul n'a pas la classe active
//       filterImg.forEach(filterImg => {
//         filterImg.style.transform = "rotateY(-180deg)";
//       });
//     }})
//   });
// });
document.addEventListener('DOMContentLoaded', function () {
    var filterbars = document.querySelectorAll(".dropdown-toggle");

    filterbars.forEach((filterbar) => {
        filterbar.addEventListener('shown.bs.dropdown', (event)=> {
            var filterImg = event.currentTarget.querySelector("img.fleche");
            filterImg.style.transform = "rotate(180deg)";
        });

        filterbar.addEventListener('hidden.bs.dropdown',  (event)=>  {
            var filterImg = event.currentTarget.querySelector("img.fleche");
            filterImg.style.transform = "rotate(0deg)";
        });
    });
});
