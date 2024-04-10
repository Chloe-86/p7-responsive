class ModelRecipes{
    constructor(recipes, recipeContainer){
        this.recipes = recipes;
        this.recipeContainer = recipeContainer;
    }
      /**
   * Affiche une recette dans le conteneur spécifié.
   * @param {Array<Object>} recipe - La recette à afficher.
   * @memberof DisplayRecipes
   */
    display10Recipes(array) {
        this.recipeContainer.innerHTML = "";
        array.slice(0, 10).forEach(recipe => { // Parcourir les 10 premières recettes
            const { name, description, ingredients, image } = recipe; // Extraire les données de chaque recette
            const recipeCard = new FactoryCard(this.recipeContainer);
            const imagePath = `./assets/images/recipes/${image}`;
            recipeCard.renderCard(name, description, ingredients, imagePath);
        });
    }
    displayRecipes(array) {
       this.recipeContainer.innerHTML = "";
      array.forEach(recipe => { 
          const { name, description, ingredients, image, time } = recipe; // Extraire les données de chaque recette
          const recipeCard = new FactoryCard(this.recipeContainer);
          const imagePath = `./assets/images/recipes/${image}`;
          recipeCard.renderCard(name, description, ingredients, imagePath, time);
      });
  }
}