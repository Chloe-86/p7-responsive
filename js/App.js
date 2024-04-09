/**
 * Classe représentant l'application principale.
 * @class
 */
class App {
    /**
     * Crée une instance de App.
     */
    constructor() {
        /**
         * Objet pour accéder aux données des recettes à partir de l'API.
         * @type {recipesApi}
         */
        this.dataRecipeApi = new recipesApi("/js/data/recipe.json");

        /**
         * Conteneur HTML où les recettes seront affichées.
         * @type {HTMLElement}
         */
        this.recipeContainer = document.querySelector('.recipe');
    }

    /**
     * Démarre l'application en récupérant les recettes, les affichant et en configurant les filtres.
     */
    async start() {
            this.recipes = await this.fetchRecipes();
            this.Filters(this.recipes);
    }

    /**
     * Récupère la liste des recettes à partir de l'API.
     * @returns {Promise<Array<Object>>} Liste des recettes récupérées.
     */
    async fetchRecipes() {
        return await this.dataRecipeApi.getList();
    }

  
    /**
     * Affiche et configure les filtres pour les recettes.
     * @param {Array<Object>} recipes - Liste des recettes à filtrer.
     */
    Filters() {
        const filterForm = new FilterForm(this.recipes, this.recipeContainer);
        filterForm.renderFilters();
    }
}

// Démarrage de l'application
const app = new App();
app.start();



