/**
 * Cette classe permets d'afficher les filtres et de filtrer les cartes.
 * @class FilterForm
 */
class FilterForm {
  constructor(recipes, recipeContainer, modelRecipes) {
    this.recipes = recipes;
    this.recipeContainer = recipeContainer;
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
    this.cardWrapper = document.querySelector(".recipe");
    this.filterWrapperulIng = document.querySelector("#ingredients");
    this.selectedFilters = document.querySelector(".selectedFilters ul");
    this.selectElt = document.querySelectorAll(".select-element");
    this.filterWrapperulApp = document.querySelector("#appliance");
    this.filterWrapperulUst = document.querySelector("#ustensils");
    this.totalRecipes = document.querySelector(".filter-right p");
    this.inputs = document.querySelectorAll("input.search");
    this.ingredientsSet = new Set();
    this.applianceSet = new Set();
    this.ustensilsSet = new Set();
    this.filteredIngredients = new Set();
    this.btnSearch = document.querySelector("span#logo-research");
    this.displayRecipes = modelRecipes.displayRecipes;
    this.searchInput = document.querySelector(".input");
    this.recipeFilterTemp = [];
    this.arrayFilter = [];
    this.count = 0;
    this.inputError;
    this.selectError;
  }

  /**
   *Modele creation et afficher les elements de filtres dans chaque filtre
   * @param {HTMLElement} ulElement- L'élément UL (ing, app, ust).
   * @param {Array<string} dataSet - Les données du tableau en question.
   * @memberof FilterForm
   */
  renderFilterModel(ulElement, dataSet) {
    ulElement.innerHTML = "";
    let index = 0;
    dataSet.forEach((item) => {
      const liElt = document.createElement("li");
      liElt.textContent = item.toLowerCase();
      liElt.setAttribute("data-id", index);
      ulElement.appendChild(liElt);
      index++;
    });
  }

  addActiveFilterModel(wrapper, text) {
    return (wrapper.innerHTML += text);
  }
  removeActiveFilterModel(wrapper, elt) {
    return wrapper.remove(elt);
  }
  findGrandPa(target) {
    return (this.grandPaElt = target.parentNode.parentNode);
  }
  findArPa(target) {
    return (this.arPaElt = target.parentNode.parentNode.parentNode);
  }

  /**
   * Affiche un message d'erreur si rien n est trouve avec les 2 cas en fonction de l'inputsearch ou des filtres sélectionés.
   *
   * @memberof FilterForm
   */
  errorMessage(error) {
    let message = ""; // Message d'erreur par défaut
    let message2 = "";
    if (error === "inputError") {
      // Cas où aucun résultat n'est trouvé pour la recherche utilisateur
      message = `<h2 class="m-4 errorRecipe">Aucune recette ne contient "${this.query}".</h2>`;
      message2 = `Vous pouvez chercher « tarte aux pommes », « poisson ».`;
    } else if (error === "selectError") {
      // Cas où aucun résultat n'est trouvé pour les filtres sélectionnés
      message = `<h2 class="m-4">Aucune recette ne correspond aux filtres sélectionnés.</h2>`;
      message2 = `Vous pouvez sélectionner un autre filtre.`;
    }

    this.recipeContainer.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="mx-auto text-center" style="font-family: 'Roboto', sans-serif;">
                        ${message}
                        <h3 class="m-4">${message2}<br>Merci.</h3>
                    </div>
                </div>
            </div>
        </div>`;
  }

  /**
   * Compare l'input utilisateur au dela de 3 characteres entrées et affiche un message d 'erreur si aucune terme n 'est trouvé.
   * @memberof FilterForm
   */
  compareResult() {
    if (this.query.length >= 3) {
      // Filtrer les recettes en fonction de la recherche
      const filteredRecipes = this.recipes.filter((recipe) => {
        // Vérifier si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
        return this.compareJSON(recipe, this.query);
      });
      // Afficher les nouvelles recettes filtrées
      if (filteredRecipes.length === 0) {
        this.errorMessage("inputError");
      } else {
        // Afficher les nouvelles recettes filtrées
        this.displayRecipes(filteredRecipes);
        this.renderTotal(filteredRecipes);
      }
    } else if (this.query.length === 0) {
      this.displayRecipes(this.recipes);
      this.renderTotal(this.recipes);
    }
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
    // Initialiser les ensembles
    for (let recipe of this.recipes) {
      for (let ingredientObj of recipe.ingredients) {
        this.ingredientsSet.add(ingredientObj.ingredient.toLowerCase());
      }
      this.applianceSet.add(recipe.appliance.toLowerCase());
      for (let ustensil of recipe.ustensils) {
        this.ustensilsSet.add(ustensil.toLowerCase());
      }
    }

    // Convertir les ensembles en tableaux
    this.ingredients = [];
    for (let ingredient of this.ingredientsSet) {
      this.ingredients.push(ingredient);
    }
    this.appliances = [];
    for (let appliance of this.applianceSet) {
      this.appliances.push(appliance);
    }
    this.ustensils = [];
    for (let ustensil of this.ustensilsSet) {
      this.ustensils.push(ustensil);
    }
  }

  /**
   * Permets d 'extraire les filtres et les mettre en dessous pour les garder visuellement en mémoire pour l'utilisateur
   *
   * @param {HTMLElement} ulElementWrapper- L'élément UL où les filtres sélectionnés seront affichés.
   * @param {HTMLElement} filtersElement- chaque li des filtres en question
   * @memberof FilterForm
   */

  //autre test de reformatage
  onClick(ulElementWrapper, filtersElement, wrapperElt) {
    // On vide le contenu de la sélection de filtres
    ulElementWrapper.innerHTML = "";

    // Ajouter un écouteur d'événements sur le wrapper
    wrapperElt.addEventListener("click", (e) => {
      if (filtersElement) {
        this.handleFilterClick(e.target, ulElementWrapper);
      }
    });
  }

  handleFilterClick(target, ulElementWrapper) {
    this.itemActive = target;
    this.selectedItem = target.textContent;

    // Récupérer la classe de l'élément parent
    this.findGrandPa(target);
    this.paEltSelectItembro =
      this.grandPaElt.previousElementSibling.classList[
        this.grandPaElt.previousElementSibling.classList.length - 2
      ];

    this.parentSelected = target.parentNode;
    this.parentSelectedbro = this.parentSelected.previousElementSibling;

    this.dataId = target.getAttribute("data-id");
    this.addActiveFilterModel(
      this.parentSelectedbro,
      `<li class="li-item removeFilter ${this.parentSelected.id}" data-id= ${this.parentSelected.id}-${this.dataId}>${this.selectedItem}<span><img class="delete" src="./assets/svg/mini-croix.svg" alt="croix"></span></span></li>`
    );

    // Création dans le filtre des sélections en dessous
    ulElementWrapper.innerHTML += `<li class="btn-filter li-item removeFilter ${this.parentSelected.id}" data-id= ${this.parentSelected.id}-${this.dataId}>${this.selectedItem}<span>
        <img class="delete" src="./assets/svg/close-btn.svg" alt="croix"></span></li>`;
    ulElementWrapper.classList.add("active");

    this.removeActiveFilterModel(this.itemActive, this.paEltSelectItembro);

    // Ajout dans un tableau qui permet de filtrer les recettes
    this.arrayFilter.push(this.selectedItem);
    this.filterSelection(this.recipes);
  }

  onDeleteFromSearch(target) {
    const btnFilterClosest = target.closest(".removeFromSearch");
    // // Supprimer l'élément de filtre parent de l'image cliquée
    btnFilterClosest.remove();
  }

  onDelete() {
    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        this.dataIdEvent =
          e.target.parentNode.parentNode.getAttribute("data-id");
        this.dataIdE = e.target.parentNode.parentNode;

        const selectEltLi = document.querySelectorAll(".li-item");

        selectEltLi.forEach((li) => {
          if (li.getAttribute("data-id") === this.dataIdEvent) {
            li.remove();
            this.arrayFilter = this.arrayFilter.filter(
              (element) => element !== li.textContent
            );
          }
        });
        //  Filtrer les recettes en fonction des filtres restants
        this.filterSelection(this.recipes);
      }
      if (this.arrayFilter.length === 0) {
        this.displayRecipes(this.recipes);
        this.renderTotal(this.recipes);
        this.selectedFilters.classList.remove("active");
      }
    });
  }

  /**
   * Récupere le contenu des recettes et verifie les termes pour chaque filtre de sélection avec le terme selectionné.
   * @memberof FilterForm
   */

  filterSelection() {
    const filteredRecipes = [];

    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];
      let match = true;

      for (let j = 0; j < this.arrayFilter.length; j++) {
        const filter = this.arrayFilter[j].toLowerCase();
        const ingredients = recipe.ingredients.map((ingredient) =>
          ingredient.ingredient.toLowerCase()
        );
        const ustensils = recipe.ustensils.map((ustensil) =>
          ustensil.toLowerCase()
        );
        const appliance = recipe.appliance.toLowerCase();

        if (
          !(
            ingredients.some((ingredient) => ingredient.includes(filter)) ||
            ustensils.some((ustensil) => ustensil.includes(filter)) ||
            appliance.includes(filter)
          )
        ) {
          match = false;
          break;
        }
      }

      if (match) {
        filteredRecipes.push(recipe);
      }
    }

    if (filteredRecipes.length === 0) {
      this.errorMessage("selectError");
      this.renderTotal(filteredRecipes);
    } else {
      this.displayRecipes(filteredRecipes);
      this.renderTotal(filteredRecipes);
    }
  }

  /**
   * verifie entrée utilisateur des filtres
   *
   * @param {*} input
   * @param {} dataSet
   * @param {*} filterWrapper
   * @memberof FilterForm
   */
  onSearch(input, dataSet, filterWrapper) {
    input.addEventListener("keyup", (e) => {
      const query = e.target.value.toLowerCase();

      // Lance la recherche si la longueur de la requête est supérieure ou égale à 1
      if (query.length >= 3) {
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

  onSearchAdd() {
    this.errorDisplay = document.querySelector(".recipe h2");
    if (!this.errorDisplay.classList.contains("errorRecipe")) {
      this.selectedFilters.innerHTML += `<li class="btn-filter removeFromSearch">${this.query}<span>
        <img src="./assets/svg/close-btn.svg" alt="croix"></span></li>`;
      this.selectedFilters.classList.add("active");
    }
  }

  onSearchDelete() {
    if (!this.errorDisplay.classList.contains("errorRecipe")) {
      document
        .querySelector("li.btn-filter span img")
        .addEventListener("click", (e) => {
          this.onDeleteFromSearch(e.target);
        });
    }
  }
  /**
   * Cette méthode met à jour l'affichage du nombre total de recettes dans l'interface utilisateur.
   *
   * @param {array} --le tableau de recette filtré ou pas
   * @memberof FilterForm
   */
  renderTotal(array) {
    let total = array.length;

    if (total === 1) {
      this.totalRecipes.innerHTML = `<span>${total}</span> recette`;
    } else if (total > 1) {
      this.totalRecipes.innerHTML = `<span>${total}</span> recettes`;
    } else {
      this.totalRecipes.innerHTML = `<span>${total}</span> recette`;
    }

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

    // déclaration des appels de rendu filtres
    this.renderFilterModel(this.filterWrapperulIng, this.ingredients);
    this.renderFilterModel(this.filterWrapperulApp, this.appliances);
    this.renderFilterModel(this.filterWrapperulUst, this.ustensils);
    //affichage du rendu de base des recettes
    this.renderTotal(this.recipes);

    // Déclenchement des methodes de filtres
    this.onClick(
      this.selectedFilters,
      document.querySelectorAll("#ingredients li"),
      this.filterWrapperulIng
    );
    this.onClick(
      this.selectedFilters,
      document.querySelectorAll("#appliance li"),
      this.filterWrapperulApp
    );
    this.onClick(
      this.selectedFilters,
      document.querySelectorAll("#ustensils li"),
      this.filterWrapperulUst
    );
    this.onDelete();

    this.searchInput.addEventListener("keyup", (e) => {
      this.query = `${e.target.value} `;
      this.compareResult();
    });

    this.btnSearch.addEventListener("click", (e) => {
      e.preventDefault();
      this.onSearchAdd();
      this.onSearchDelete();
      this.compareResult();
      e.stopPropagation();
    });

    // Gestion des événements de filtrage pour chaque champ de recherche
    this.onSearch(this.inputs[0], this.ingredients, this.filterWrapperulIng);
    this.onSearch(this.inputs[1], this.appliances, this.filterWrapperulApp);
    this.onSearch(this.inputs[2], this.ustensils, this.filterWrapperulUst);
  }
}
