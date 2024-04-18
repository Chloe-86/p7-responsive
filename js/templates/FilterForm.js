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
    // this.selectElt = document.querySelector(".select-element");
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
    this.searchInput = document.querySelector(".input-group input");
    this.recipeFilterTemp = [];
    this.arrayFilter = [];
    this.count = 0;
    this.inputError;
    this.selectError;
    // this.ingLi = document.querySelectorAll("#ingredients li");
    // this.ustLi = document.querySelectorAll("#appliance li");
    // this.AppLi = document.querySelectorAll("#ustensils li");
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
      message = `<h2 class="m-4">Aucune recette ne contient "${this.query}".</h2>`;
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
    this.query = this.searchInput.value.trim().toLowerCase();
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

    this.onClickRemoveEvent(ulElementWrapper);
  }

  onClickRemoveEvent(ulElementWrapper, elt) {
    // Ajouter un écouteur d'événements sur ulElementWrapper pour gérer les clics sur les boutons de suppression
    ulElementWrapper.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG") {
        this.handleRemoveButtonClick(e.target, ulElementWrapper, elt);
      }
      // this.onClick(
      //   this.selectedFilters,
      //   document.querySelectorAll("#ingredients li"),
      //   this.filterWrapperulIng
      // );
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

    this.addActiveFilterModel(
      this.parentSelectedbro,
      `<li class="li-item removeFilter" id="${this.parentSelected.id}">${this.selectedItem}<span><img src="./assets/svg/mini-croix.svg" alt="croix"></span></span></li>`
    );

    // Création dans le filtre des sélections en dessous
    ulElementWrapper.innerHTML += `<li class="btn-filter removeFilter" id="${this.parentSelected.id}">${this.selectedItem}<span>
        <img src="./assets/svg/close-btn.svg" alt="croix"></span></li>`;
    ulElementWrapper.classList.add("active");

    this.removeActiveFilterModel(this.itemActive, this.paEltSelectItembro);

    // Ajout dans un tableau qui permet de filtrer les recettes
    this.arrayFilter.push(this.selectedItem);
    this.filterSelection(this.recipes);
  }

  handleRemoveButtonClick(target, ulElementWrapper, elt) {
    const btnFilterClosest = target.closest(".removeFilter");

    if (!btnFilterClosest) return; // Si le bouton de suppression n'est pas dans un élément .btn-filter, sortir
    const removedText = btnFilterClosest.textContent.trim().toLowerCase();

    if (elt === removedText) {
      btnFilterClosest.remove();
    }
    // Supprimer l'élément de filtre parent de l'image cliquée
    btnFilterClosest.remove();

    // Supprimer l'élément de la liste des filtres actifs
    this.arrayFilter = this.arrayFilter.filter(
      (element) => element !== removedText
    );

    // Si la liste des filtres est vide, afficher toutes les recettes et le rendu total
    if (this.arrayFilter.length === 0) {
      this.displayRecipes(this.recipes);
      this.renderTotal(this.recipes);
    }

    // Si la liste des filtres est vide, retirer la classe "active" de ulElementWrapper
    if (ulElementWrapper.innerHTML === "") {
      ulElementWrapper.classList.remove("active");
    }

    // Filtrer les recettes en fonction des filtres restants
    this.filterSelection(this.recipes);
  }

  /**
   * Récupere le contenu des recettes et verifie les termes pour chaque filtre de sélection avec le terme selectionné.
   * @memberof FilterForm
   */

  filterSelection() {
    this.recipesFiltered = this.recipes.filter((recipe) => {
      // Vérifier si chaque filtre est présent dans la recette
      const match = this.arrayFilter.every(
        (filter) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())
          ) ||
          recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(filter.toLowerCase())
          ) ||
          recipe.appliance.toLowerCase().includes(filter.toLowerCase())
      );

      // Retourner true si tous les filtres sont présents dans la recette
      return match;
    });

    // Si aucune recette ne correspond aux filtres, afficher un message d'erreur
    if (this.recipesFiltered.length === 0) {
      this.errorMessage("selectError");
      this.renderTotal(this.recipesFiltered);
    } else {
      // Afficher les recettes filtrées et mettre à jour le total
      this.displayRecipes(this.recipesFiltered);
      this.renderTotal(this.recipesFiltered);
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

    this.searchInput.addEventListener("keyup", (e) => {
      this.compareResult();
    });

    this.btnSearch.addEventListener("click", () => {
      this.selectedFilters.innerHTML += `<li class="btn-filter">${this.query}<span>
            <img src="./assets/svg/close-btn.svg" alt="croix"></span></li>`;
      this.selectedFilters.classList.add("active");
    });

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
    // this.selectElt.forEach(element => {
    //   this.onClickRemoveEvent(element);
    // });

    // Gestion des événements de filtrage pour chaque champ de recherche
    this.onSearch(this.inputs[0], this.ingredients, this.filterWrapperulIng);
    this.onSearch(this.inputs[1], this.appliances, this.filterWrapperulApp);
    this.onSearch(this.inputs[2], this.ustensils, this.filterWrapperulUst);
  }
}
