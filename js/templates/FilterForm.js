/**
 * Cette classe permets d'afficher les filtres et de filtrer les cartes.
 *
 * @class FilterForm
 */
class FilterForm {
  constructor(recipeContainer) {
    this.recipeContainer = recipeContainer;
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
    this.cardWrapper = document.querySelector(".recipe");
    this.filterWrapperulIng = document.querySelector("#ingredients");
    this.selectedFilter = document.querySelector("ul.selected-filter");
    this.selectedFilters = document.querySelector(".selectedFilters ul");
    this.filterWrapperulApp = document.querySelector("#appliance");
    this.filterWrapperulUst = document.querySelector("#ustensils");
    this.totalRecipes = document.querySelector(".filter-right span");
    this.filterListItems = document.querySelectorAll(".filter-list-item");
    this.inputs = document.querySelectorAll("input.search");
    this.ingredientsSet = new Set();
    this.applianceSet = new Set();
    this.ustensilsSet = new Set();
    this.filteredIngredients = new Set();
    
  }

  /**
   *
   * Modèle pour effacer un element.
   * @param {HTMLElement} element
   * @memberof FilterForm
   */
  clearElement(element) {
    element.innerHTML = "";
  }

  /**
   *Modele creation et afficher les elements de filtres dans chaque filtre
   *
   * @param {HTMLElement} ulElement- L'élément UL (ing, app, ust).
   * @param {Array<string} dataSet - Les données du tableau en question.
   * @memberof FilterForm
   */
  renderFilterModel(ulElement, dataSet) {
    this.clearElement(ulElement);
    dataSet.forEach((item) => {
      const liElt = document.createElement("li");
      liElt.textContent = item.toLowerCase();
      ulElement.appendChild(liElt);
    });
  }

  /**
   * Création de 3 tableaux differents contenant les élèments.
   *
   * @memberof FilterForm
   */
  initializeData() {
    this.recipeContainer.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientObj) => {
        this.ingredientsSet.add(ingredientObj.ingredient.toLowerCase());
      });
      this.applianceSet.add(recipe.appliance.toLowerCase());
      recipe.ustensils.forEach((ustensil) => {
        this.ustensilsSet.add(ustensil.toLowerCase());
      });
    });
    // Convertir les ensembles en tableaux pour permettre l'itération et l'accès facile
    this.ingredients = Array.from(this.ingredientsSet);
    this.appliances = Array.from(this.applianceSet);
    this.ustensils = Array.from(this.ustensilsSet);
  }

  /**
   * Permets d 'extraire les filtres et les mettre en dessous pour les garder visuellement en mémoire pour l'utilisateur
   *
   * @param {HTMLElement} ulElement- L'élément UL où les filtres sélectionnés seront affichés.
   * @param {*} filtersElement- Le filtre en question
   * @memberof FilterForm
   */

  onClick(ulElement, filtersElement) {
    // On vide le contenu de la sélection de filtres
    this.clearElement(ulElement);
    filtersElement.addEventListener("click", (e) => {
      this.selectedItem = e.target.textContent;

      ulElement.innerHTML += `<li class="btn-filter">${this.selectedItem}<span>
            <img src="./assets/svg/close-btn.svg" alt="croix"></span></li>`;
      ulElement.classList.add("active");
    });
    // Ajoutez un gestionnaire d'événements pour les clics sur les boutons de suppression des filtres
    ulElement.addEventListener("click", (e) => {
      // Vérifiez si l'élément cliqué est un bouton de suppression (balise <img>)
      if (e.target.tagName === "IMG") {
        // Supprimez l'élément de filtre parent de l'image cliquée
        e.target.closest(".btn-filter").remove();
        if (ulElement.innerHTML === "") {
          ulElement.classList.remove("active");
        }
      }
    });
  }

  /**
   * Cette méthode met à jour l'affichage du nombre total de recettes dans l'interface utilisateur.
   *
   * @param {Number} total
   * @memberof FilterForm
   */
  renderTotal(total) {
    total = this.recipeContainer.length; // Mise à jour du total
    this.totalRecipes.textContent = total; // Ajout du total en tant que texte
    return total; // Renvoyer le total mis à jour si nécessaire
  }

  /**
   *  Déclenche les rendu des filtres et de leur méthodes
   *
   * @memberof FilterForm
   */

  renderFilters() {
    this.renderTotal();
    // tableau d initialisation des datas
    this.initializeData();
    // déclaration des appels de rendu filtres
    this.renderFilterModel(this.filterWrapperulIng, this.ingredients);
    this.renderFilterModel(this.filterWrapperulApp, this.appliances);
    this.renderFilterModel(this.filterWrapperulUst, this.ustensils);
    // Déclenchement des methodes de filtres
    this.onClick(this.selectedFilters, this.filterWrapperulIng);
    this.onClick(this.selectedFilters, this.filterWrapperulApp);
    this.onClick(this.selectedFilters, this.filterWrapperulUst);
  }

  // rendu des cartes filtré
  /**
   * Trier les cartes d'après les filtres
   *
   * @memberof FilterForm
   */
  renderCards() {}
}
