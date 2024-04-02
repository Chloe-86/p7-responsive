class SearchForm {
    constructor(Ingredients) {
        this.Ingredients = Ingredients
        this.isSearchingByIngredients = false // Indique si la recherche se fait par ingredients de base ell est sur false

        this.UstencilsNameSearch = new UstencilsNameSearch(Ingredients)
        this.IngredientsNameSearch = new IngredientsNameSearch(Ingredients)

        // this.$wrapper = document.createElement('div')
        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
        this.$moviesWrapper = document.querySelector('.movies-wrapper')
    }

    search(query) {
        let SearchedMovies = null
        
        if (this.isSearchingByIngredients) {
            SearchedMovies = this.IngredientsNameSearch.search(query)
        } else {
            SearchedMovies = this.MovieNameSearch.search(query)
        }

        this.displayMovies(SearchedMovies)
    }

    clearMoviesWrapper() {
        this.$moviesWrapper.innerHTML = ""
    }

    displayMovies(Movies) {
        this.clearMoviesWrapper()

        Movies.forEach(Movie => {
            const Template = new MovieCard(Movie)
            this.$moviesWrapper.appendChild(Template.createMovieCard())
        })
    }

    onSearch() {
        this.$wrapper
            .querySelector('form')
            .addEventListener('keyup', e => {
                const query = e.target.value

                if (query.length >= 3) {
                    this.search(query)
                } else if (query.length === 0) {
                    this.displayMovies(this.Ingredients)
                }
            })
    }

    onChangeSearch() {
        this.$wrapper
            .querySelector('.search-checkbox')
            .addEventListener('change', e => {
                this.isSearchingByIngredients = e.target.checked

                console.log(this.isSearchingByIngredients)
            })
    }

    render() {
        const searchForm = `
            <form action="#" method="POST">
                <div class="search-input">
                    <label for="search">Rechercher : </label> 
                    <input id="search" type="text">
                </div>
                <div class="search-checkbox">
                    <label for="actor">Rechercher par acteur</label>
                    <input id="actor" type="checkbox" />
                </div>
            </form>
        `

        this.$wrapper.innerHTML = searchForm

        this.onSearch()
        this.onChangeSearch()

        this.$searchFormWrapper.appendChild(this.$wrapper)
    }
}