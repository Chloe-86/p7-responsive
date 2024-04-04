// // Définition d'une classe FilterForm
// class FilterForm {
//   // Constructeur de la classe prenant le paramètre Movies
//   constructor(recipeContainer) {
//     // Assignation du paramètre Movies à une propriété de l'instance
//     this.recipeContainer = recipeContainer;
//     this.cardWrapper = document.querySelector(".recipe");

//     // Sélection de l'élément avec la classe "filter-form-wrapper" pour le wrapper du formulaire
//     this.filterWrapperulIng = document.querySelector("#ingredients");
//     this.filterWrapperulApp = document.querySelector("#appliance");
//     this.filterWrapperulUst = document.querySelector("#ustensils");
//     this.totalRecipes = document.querySelector(".filter-right span");
//     this.listIngredientsArray = [];
//   }

//   clearCardWrapper() {
//     this.cardWrapper.innerHTML = "";
//   }
//   renderFilterIngredients() {
//     let count = 0; // Variable pour compter le nombre d'ingrédients ajoutés
//     // Parcourir chaque élément du conteneur de recettes
//     this.recipeContainer.forEach((recipe) => {
//       // Parcourir chaque ingrédient de la recette
//       recipe.ingredients.forEach((ingredientObj) => {
//         // Vérifier si le nombre d'ingrédients ajoutés est inférieur à 10
//         // if (count < 10) {
//         //     // Créer un nouvel élément de liste à chaque itération
//         //     const liElt = document.createElement('li');
//         //     liElt.textContent = ingredientObj.ingredient;
//         //     // Ajouter l'élément de liste à la liste d'ingrédients
//         //     this.filterWrapperulIng.appendChild(liElt);
//         //     count++; // Incrémenter le compteur
//         // } else {
//         //     return; // Sortir de la boucle si 10 ingrédients ont déjà été ajoutés
//         // }
//         const liElt = document.createElement("li");
//         liElt.textContent = ingredientObj.ingredient;
//         // Ajouter l'élément de liste à la liste d'ingrédients
//         this.filterWrapperulIng.appendChild(liElt);
//       });
//     });
//   }
//   renderFilterAppliance() {
//     let count = 0; // Variable pour compter le nombre d'ingrédients ajoutés
//     // Parcourir chaque élément du conteneur de recettes
//     this.recipeContainer.forEach((recipe) => {
//       const liElt = document.createElement("li");
//       liElt.textContent = recipe.appliance;
//       this.filterWrapperulApp.appendChild(liElt);
//     });
//   }
//   renderFilterUstencils() {
//     let count = 0; // Variable pour compter le nombre d'ingrédients ajoutés
//     // Parcourir chaque élément du conteneur de recettes
//     this.recipeContainer.forEach((recipe) => {
//       // console.log(recipe.ustencils);
//       // Parcourir chaque ingrédient de la recette
//       recipe.ustensils.forEach((ingredientObj) => {
//         // Vérifier si le nombre d'ingrédients ajoutés est inférieur à 10
//         // console.log(ingredientObj);
//         const liElt = document.createElement("li");
//         liElt.textContent = ingredientObj;
//         this.filterWrapperulUst.appendChild(liElt);
//       });
//     });
//   }
//   renderTotal(total) {
//     total = this.recipeContainer.length; // Mise à jour du total
//     console.log(total); // Vérification dans la console
//     this.totalRecipes.textContent = total; // Ajout du total en tant que texte
//     return total; // Renvoyer le total mis à jour si nécessaire
//   }

// }

class FilterForm {
  constructor(recipeContainer) {
    this.recipeContainer = recipeContainer;
    this.cardWrapper = document.querySelector(".recipe");
    this.filterWrapperulIng = document.querySelector("#ingredients");
    this.selectedFilter = document.querySelector("ul.selected-filter");
    this.selectedFilters = document.querySelector(".selectedFilters ul")
    this.filterWrapperulApp = document.querySelector("#appliance");
    this.filterWrapperulUst = document.querySelector("#ustensils");
    this.totalRecipes = document.querySelector(".filter-right span");
    this.filterListItems = document.querySelectorAll(".filter-list-item");
    this.ingredientsSet = new Set();
    this.applianceSet = new Set();
    this.ustensilsSet = new Set();
    this.filteredIngredients = new Set();
  }

  clearCardWrapper() {
    this.cardWrapper.innerHTML = "";
  }

  renderFilters() {
   

    this.recipeContainer.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientObj) => {
        this.ingredientsSet.add(ingredientObj.ingredient);
      });
      this.applianceSet.add(recipe.appliance);
      recipe.ustensils.forEach((ustensil) => {
        this.ustensilsSet.add(ustensil);
      });
    });

    this.renderFilterList(this.filterWrapperulIng,this.ingredientsSet);
    this.renderFilterList(this.filterWrapperulApp, this.applianceSet);
    this.renderFilterList(this.filterWrapperulUst, this.ustensilsSet);
  }

  renderFilterList(ulElement, dataSet) {
    ulElement.innerHTML = "";
    dataSet.forEach((item) => {
      const liElt = document.createElement("li");
      liElt.textContent = item.toLowerCase();
      ulElement.appendChild(liElt);
    });
  }

  renderTotal() {
    const total = this.recipeContainer.length;
    this.totalRecipes.textContent = total;
    return total;
  }

  onClick(){
    console.log(this.filteredIngredients)
    // this.filteredIngredients.addEventListener('click', (e)=>{
    //     console.log('ok');
    //   })
  }

  onSearch() {
    document
      .querySelector("#search-ingredients")
      .addEventListener("keyup", (e) => {
        const query = e.target.value.toLowerCase();
  
        // Lance la recherche si la longueur de la requête est supérieure ou égale à 1
        if (query.length >= 1) {
          this.filterWrapperulIng.innerHTML = "";
  
          const filteredIngredients = new Set(
            Array.from(this.ingredientsSet).filter((ingredient) =>
              ingredient.toLowerCase().includes(query)
            )
          );
  
          // Afficher les ingrédients filtrés
          this.renderFilterList(this.filterWrapperulIng, filteredIngredients);
          this.onClick()
          
        } else if (query.length === 0) {
          // Réinitialiser la liste des ingrédients si la requête est vide
          this.renderFilterList(this.filterWrapperulIng, this.ingredientsSet);
        }
      });
    this.onClick()
      
  }
  onClick() {
    this.selectedFilter.innerHTML = "";
    this.filterWrapperulIng.addEventListener('click', (e)=>{
    const selectedItem = e.target.textContent;

     this.selectedFilter.innerHTML = `<li>${selectedItem}</li>`;
     this.selectedFilter.classList.add('active');
    
     this.selectedFilters.innerHTML += `<li class="btn-filter">${selectedItem}<span>
     <img src="./assets/svg/close-btn.svg" alt="croix"></span></li>`;
     this.selectedFilters.classList.add('active');
    
    })
  

  // Ajoutez un gestionnaire d'événements pour les clics sur les boutons de suppression des filtres
  this.selectedFilters.addEventListener('click', (e) => {
    // Vérifiez si l'élément cliqué est un bouton de suppression (balise <img>)
    if (e.target.tagName === 'IMG') {
      // Supprimez l'élément de filtre parent de l'image cliquée
      e.target.closest('.btn-filter').remove();
      
      // this.selectedFilters.classList.remove('active');
    }
  });
  }
  
  
}
