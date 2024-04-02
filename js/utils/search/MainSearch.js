class Search {
    constructor(recipes) {
        this.Recipes = Recipes
    }

    search(query) {
        return this.filterMovies(query)
    }
}


class UstencilsNameSearch extends Search {
    constructor(recipes) {
        super(recipes)
    }

    filterMovies(query) {
        return this.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query.toLowerCase())
        )
    }
}


class IngredientsNameSearch extends Search {
    constructor(recipes) {
        super(recipes)
    }

    filterMovies(query) {
        return this.recipes.filter(recipe =>
            recipe.actor.toLowerCase().includes(query.toLowerCase())
        )
    }
}