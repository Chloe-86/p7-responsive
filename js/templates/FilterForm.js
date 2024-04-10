/**
 * Cette classe permets d'afficher les filtres et de filtrer les cartes.
 * @class FilterForm
 */
class FilterForm {
  constructor(recipes, recipeContainer) {
    this.recipes = recipes;
    this.recipeContainer = recipeContainer;
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
    this.cardWrapper = document.querySelector(".recipe");
    this.filterWrapperulIng = document.querySelector("#ingredients");
    this.selectedFilters = document.querySelector(".selectedFilters ul");
    this.filterListItem = document.querySelector(".filter-list-item ul");
    this.filterWrapperulApp = document.querySelector("#appliance");
    this.filterWrapperulUst = document.querySelector("#ustensils");
    this.totalRecipes = document.querySelector(".filter-right span");
    this.inputs = document.querySelectorAll("input.search");
    this.ingredientsSet = new Set();
    this.applianceSet = new Set();
    this.ustensilsSet = new Set();
    this.filteredIngredients = new Set();
    this.btnSearch = document.querySelector("span#logo-research");
    this.displayOnlyTenRecipes(this.recipes);
    this.searchInput = document.querySelector(".input-group input");
  }

  /**
   *Modele creation et afficher les elements de filtres dans chaque filtre
   * @param {HTMLElement} ulElement- L'élément UL (ing, app, ust).
   * @param {Array<string} dataSet - Les données du tableau en question.
   * @memberof FilterForm
   */
  renderFilterModel(ulElement, dataSet) {
    ulElement.innerHTML = "";
    dataSet.forEach((item) => {
      const liElt = document.createElement("li");
      liElt.textContent = item.toLowerCase();
      ulElement.appendChild(liElt);
    });
  }
  /**
   * Affiche une recette dans le conteneur spécifié.
   * @param {Object} recipe - La recette à afficher.
   * @memberof FilterForm
   */
  displayRecipeModel(recipe) {
    const { name, description, ingredients, image } = recipe;
    const recipeCard = new FactoryCard(this.recipeContainer);
    const imagePath = `./assets/images/recipes/${image}`;
    recipeCard.renderCard(name, description, ingredients, imagePath);
  }

  /**
   * Affiche les recettes dans le conteneur spécifié.
   * @param {Array<Object>} array - Liste des recettes à afficher.
   * @memberof FilterForm
   */
  displayOnlyTenRecipes(array) {
    this.recipeContainer.innerHTML = "";
    array.slice(0, 10).forEach((recipe) => {
      this.displayRecipeModel(recipe);
    });
  }
  displayAllRecipes(array) {
    this.recipeContainer.innerHTML = "";
    array.forEach((recipe) => {
      this.displayRecipeModel(recipe);
    });
  }
  displaySearchRecipes(array) {
    this.recipeContainer.innerHTML = "";
    array.forEach((recipe) => {
      this.displayRecipeModel(recipe);
    });
  }

  /**
   * Affiche les recettes filtrées dans le conteneur spécifié.
   * @param {Array<Object>} array - Liste des recettes filtrées à afficher.
   * @memberof FilterForm
   */
  displayNewRecipes(array) {
    this.recipeContainer.innerHTML = "";
    array.forEach((recipe) => {
      this.displayRecipeModel(recipe);
    });
  }

  /**
   * Compare l'input utilisateur au dela de 3 characteres entrées et affiche un message d 'erreur si aucune terme n 'est trouvé.
   * @memberof FilterForm
   */
  compareInputResult() {
    this.searchInput.addEventListener("keyup", (e) => {
      const query = this.searchInput.value.trim().toLowerCase();
      if (query.length >= 3) {
        // Filtrer les recettes en fonction de la recherche
        const filteredRecipes = this.recipes.filter((recipe) => {
          // Vérifier si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
          return this.compareJSON(recipe, query);
        });
        // Afficher les nouvelles recettes filtrées
        if (filteredRecipes.length === 0) {
          this.recipeContainer.innerHTML = `<div class="container">
            <div class="row">
              <div class="col">
                <div class="mx-auto text-center style="font-family: 'Roboto', sans-serif;"">
                  <h2 class=" m-4">Il n'y a pas de termes contenant ces recettes</h2>
                  <h3 class="m-4"> Veuillez choisir un autre filtre, ingrédient ou ustensil.<br>
                  <p class="m-2">Merci.</p>
                </div>
              </div>
            </div>
          </div>`;
        } else {
          // Afficher les nouvelles recettes filtrées
          this.displaySearchRecipes(filteredRecipes);
          this.renderTotal(filteredRecipes);
        }
      } else if (query.length === 0) {
        this.displayAllRecipes(this.recipes);
        this.renderTotal(this.recipes);
      }
    });
  }

  /**
   * Compare la recherche utilisateur au titre , description, et ingredients
   * @param {Array<Object} recipe-l'objet de recherche
   * @param {*} query-recherche de l 'utilisateur
   * @memberof FilterForm
   */
  compareJSON(recipe, query) {
    // Vérifier si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
    const matchName = recipe.name.toLowerCase().includes(query);
    const matchDescription = recipe.description.toLowerCase().includes(query);
    const matchIngredients = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(query)
    );
    return matchName || matchDescription || matchIngredients;
  }

  /**
   * Création de 3 tableaux differents contenant les élèments.
   * @memberof FilterForm
   */
  initializeData() {
    this.recipes.forEach((recipe) => {
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
   * @param {HTMLElement} ulElementWrapper- L'élément UL où les filtres sélectionnés seront affichés.
   * @param {HTMLElement} filtersElement- Le filtre en question
   * @memberof FilterForm
   */

  onClick(ulElementWrapper, filtersElement) {
    // On vide le contenu de la sélection de filtres
    ulElementWrapper.innerHTML = "";
    filtersElement.addEventListener("click", (e) => {
      this.selectedItem = e.target.textContent;

      this.parentElementSelectedItem = e.target.parentNode.parentNode;
      this.parentElementSelectedItembrother =
        this.parentElementSelectedItem.previousElementSibling;
      this.eltClass =
        this.parentElementSelectedItembrother.classList[
          this.parentElementSelectedItembrother.classList.length - 2
        ];

      ulElementWrapper.innerHTML += `<li class="btn-filter">${this.selectedItem}<span>
            <img src="./assets/svg/close-btn.svg" alt="croix"></span></li>`;
      ulElementWrapper.classList.add("active");

      this.filterSelection();
    });

    ulElementWrapper.addEventListener("click", (e) => {
      // Vérifiez si l'élément cliqué est un bouton de suppression (balise <img>)
      if (e.target.tagName === "IMG") {
        // Supprimez l'élément de filtre parent de l'image cliquée
        e.target.closest(".btn-filter").remove();
        this.displayAllRecipes(this.recipes);
        this.renderTotal(this.recipes);
        if (ulElementWrapper.innerHTML === "") {
          ulElementWrapper.classList.remove("active");
        }
      }
    });
  }

  /**
   * Récupere le contenu des recettes et verifie les termes pour chaque filtre de sélection avec le terme selectionné.
   * @memberof FilterForm
   */
  filterSelection() {
    const filtres = document.querySelectorAll(".btn-filter");

    filtres.forEach((filtre) => {
      const resultatfiltre = filtre.textContent.trim().toLowerCase();

      const resultatclasse = this.eltClass;

      this.recipesFiltered = this.recipes.filter((recipe) => {
        if (resultatclasse === "ingredients") {
          const checkIngredient = recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(resultatfiltre)
          );
          console.log(checkIngredient);
          return checkIngredient;
        } else if (resultatclasse === "ustensils") {
          const checkUstensil = recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(resultatfiltre)
          );
          return checkUstensil;
        } else if (resultatclasse === "appliances") {
          const checkAppliance = recipe.appliance
            .toLowerCase()
            .includes(resultatfiltre);
          return checkAppliance;
        }
      });
    });
    this.displayNewRecipes(this.recipesFiltered);
    this.renderTotal(this.recipesFiltered);
  }

  /**
   * verifie entrée utilisateur des filtres 
   *
   * @param {*} input
   * @param {*} dataSet
   * @param {*} filterWrapper
   * @memberof FilterForm
   */
  onSearch(input, dataSet, filterWrapper) {
    input.addEventListener("keyup", (e) => {
      const query = e.target.value.toLowerCase();

      // Lance la recherche si la longueur de la requête est supérieure ou égale à 1
      if (query.length >= 1) {
        const filteredData = dataSet.filter((item) =>
          item.toLowerCase().includes(query)
        );

        // Afficher les données filtrées dans le wrapper de filtre approprié
        this.renderFilterModel(filterWrapper, filteredData);
      } else {
        // Réinitialiser le wrapper de filtre avec le jeu de données complet si la requête est vide
        this.renderFilterModel(filterWrapper, dataSet);
      }
    });
  }

  /**
   * Cette méthode met à jour l'affichage du nombre total de recettes dans l'interface utilisateur.
   *
   * @param {Number} total
   * @memberof FilterForm
   */
  renderTotal(array) {
    let total = array.length; // Mettre à jour le total en utilisant le tableau passé en argument
    this.totalRecipes.textContent = total; // Ajouter le total en tant que texte
    return total; // Renvoyer le total mis à jour si nécessaire
  }

  /**
   *  Déclenche les rendu des filtres et de leur méthodes
   *
   * @memberof FilterForm
   */
  renderFilters() {
    // tableau d initialisation des datas
    this.initializeData();
    this.compareInputResult();
    // déclaration des appels de rendu filtres
    this.renderFilterModel(this.filterWrapperulIng, this.ingredients);
    this.renderFilterModel(this.filterWrapperulApp, this.appliances);
    this.renderFilterModel(this.filterWrapperulUst, this.ustensils);
    //affichage du rendu de base des recettes
    this.renderTotal(this.recipes);
    // Déclenchement des methodes de filtres
    this.onClick(this.selectedFilters, this.filterWrapperulIng);
    this.onClick(this.selectedFilters, this.filterWrapperulApp);
    this.onClick(this.selectedFilters, this.filterWrapperulUst);
    // Gestion des événements de filtrage pour chaque champ de recherche
    this.onSearch(this.inputs[0], this.ingredients, this.filterWrapperulIng);
    this.onSearch(this.inputs[1], this.appliances, this.filterWrapperulApp);
    this.onSearch(this.inputs[2], this.ustensils, this.filterWrapperulUst);
  }
}
