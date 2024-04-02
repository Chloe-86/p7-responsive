// Définition d'une classe FilterForm
class FilterForm {
  // Constructeur de la classe prenant le paramètre Movies
  constructor(recipeContainer) {
    // Assignation du paramètre Movies à une propriété de l'instance
    this.recipeContainer = recipeContainer;
    this.cardWrapper = document.querySelector(".recipe");

    // Sélection de l'élément avec la classe "filter-form-wrapper" pour le wrapper du formulaire
    this.filterWrapperulIng = document.querySelector("#ingredients");
    this.filterWrapperulApp = document.querySelector("#appliance");
    this.filterWrapperulUst = document.querySelector("#ustensils");
    this.totalRecipes = document.querySelector(".filter-right span");
    this.listIngredientsArray = [];
  }

  clearCardWrapper() {
    this.cardWrapper.innerHTML = "";
  }
  renderFilterIngredients() {
    let count = 0; // Variable pour compter le nombre d'ingrédients ajoutés
    // Parcourir chaque élément du conteneur de recettes
    this.recipeContainer.forEach((recipe) => {
      // Parcourir chaque ingrédient de la recette
      recipe.ingredients.forEach((ingredientObj) => {
        // Vérifier si le nombre d'ingrédients ajoutés est inférieur à 10
        // if (count < 10) {
        //     // Créer un nouvel élément de liste à chaque itération
        //     const liElt = document.createElement('li');
        //     liElt.textContent = ingredientObj.ingredient;
        //     // Ajouter l'élément de liste à la liste d'ingrédients
        //     this.filterWrapperulIng.appendChild(liElt);
        //     count++; // Incrémenter le compteur
        // } else {
        //     return; // Sortir de la boucle si 10 ingrédients ont déjà été ajoutés
        // }
        const liElt = document.createElement("li");
        liElt.textContent = ingredientObj.ingredient;
        // Ajouter l'élément de liste à la liste d'ingrédients
        this.filterWrapperulIng.appendChild(liElt);
      });
    });
  }
  renderFilterAppliance() {
    let count = 0; // Variable pour compter le nombre d'ingrédients ajoutés
    // Parcourir chaque élément du conteneur de recettes
    this.recipeContainer.forEach((recipe) => {
      const liElt = document.createElement('li');
      liElt.textContent = recipe.appliance;
      this.filterWrapperulApp.appendChild(liElt);
    });
  }
  renderFilterUstencils() {
    let count = 0; // Variable pour compter le nombre d'ingrédients ajoutés
    // Parcourir chaque élément du conteneur de recettes
    this.recipeContainer.forEach((recipe) => {
      // console.log(recipe.ustencils);
      // Parcourir chaque ingrédient de la recette
      recipe.ustensils.forEach((ingredientObj) => {
        // Vérifier si le nombre d'ingrédients ajoutés est inférieur à 10
        // console.log(ingredientObj);
        const liElt = document.createElement('li');
        liElt.textContent = ingredientObj;
        this.filterWrapperulUst.appendChild(liElt);
      });
    });
  }
  renderTotal(total) {
    total = this.recipeContainer.length; // Mise à jour du total
    console.log(total); // Vérification dans la console
    this.totalRecipes.textContent = total; // Ajout du total en tant que texte
    return total; // Renvoyer le total mis à jour si nécessaire
}

}
