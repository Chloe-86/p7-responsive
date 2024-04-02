class App {
    constructor() {
        this.dataRecipeApi = new recipesApi("/js/data/recipe.json");
        this.recipeContainer = document.querySelector('.recipe');
    }

    async pageListRecipe() {
        const recipes = await this.dataRecipeApi.getList();
        this.displayCardRecipe(recipes); // Passer les données récupérées à displayCardRecipe()
        // this.recipesObject = recipes.map(recipe=> console.log(recipe))
        this.displayFilterElements(recipes);
    }

    displayCardRecipe(recipes) {
        recipes.slice(0, 10).forEach(recipe => { // Parcourir les 10 premières recettes
            const { name, description, ingredients, image } = recipe; // Extraire les données de chaque recette
            const recipeCard = new FactoryCard(this.recipeContainer);
            const imagePath = `./assets/images/recipes/${image}`;
            recipeCard.renderCard(name, description, ingredients, imagePath);
        });
    }
    
    displayFilterElements(recipes){
        const Filter = new FilterForm(recipes);
        Filter.renderFilterIngredients();
        Filter.renderFilterUstencils();
        Filter.renderFilterAppliance();
        Filter.renderTotal();
    }

    // const Search = new SearchForm(this.FullMovies);
    // Search.render();
}

const app = new App();
app.pageListRecipe();



