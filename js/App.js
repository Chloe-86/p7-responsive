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
        try {
            const recipes = await this.fetchRecipes();
            this.displayRecipes(recipes);
            this.setupFilters(recipes);
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    }

    /**
     * Récupère la liste des recettes à partir de l'API.
     * @returns {Promise<Array<Object>>} Liste des recettes récupérées.
     */
    async fetchRecipes() {
        return await this.dataRecipeApi.getList();
    }

    /**
     * Affiche les recettes dans le conteneur spécifié.
     * @param {Array<Object>} recipes - Liste des recettes.
     */
    displayRecipes(recipes) {
        recipes.slice(0, 10).forEach(recipe => {
            const { name, description, ingredients, image } = recipe;
            const recipeCard = new FactoryCard(this.recipeContainer);
            const imagePath = `./assets/images/recipes/${image}`;
            recipeCard.renderCard(name, description, ingredients, imagePath);
        });
    }

    /**
     * Configure les filtres pour les recettes.
     * @param {Array<Object>} recipes - Liste des recettes à filtrer.
     */
    setupFilters(recipes) {
        const filterForm = new FilterForm(recipes);
        filterForm.renderFilters();
    }
}

// Démarrage de l'application
const app = new App();
app.start();



