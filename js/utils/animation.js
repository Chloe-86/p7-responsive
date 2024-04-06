/**
 * Une classe pour gérer les animations des filtres.
 */
class FilterAnimation {
    /**
     * Crée une instance de FilterAnimation.
     */
    constructor() {
        // Initialisation des propriétés liées à l'animation
    }

    /**
     * Fait pivoter l'icône du filtre de 180 degrés.
     * @param {HTMLElement} filterbar - L'élément de barre de filtre.
     */
    rotateFilterIcon180(filterbar) {
        const filterImg = filterbar.querySelector("img.fleche");
        filterImg.style.transform = "rotate(180deg)";
    }

    /**
     * Rétablit l'icône du filtre à sa position initiale (0 degré).
     * @param {HTMLElement} filterbar - L'élément de barre de filtre.
     */
    rotateFilterIcon0(filterbar) {
        const filterImg = filterbar.querySelector("img.fleche");
        filterImg.style.transform = "rotate(0deg)";
    }

    /**
     * Ajoute des écouteurs d'événements pour les animations de filtre lorsque le DOM est chargé.
     */
    addEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const filterbars = document.querySelectorAll(".dropdown-toggle");
            filterbars.forEach((filterbar) => {
                filterbar.addEventListener('shown.bs.dropdown', (event) => {
                    this.rotateFilterIcon180(event.currentTarget);
                });
                filterbar.addEventListener('hidden.bs.dropdown', (event) => {
                    this.rotateFilterIcon0(event.currentTarget);
                });
            });
        });
    }
}

// Instantiation de la classe d'animation
const filterAnimation = new FilterAnimation();
// Ajout des écouteurs d'événements à l'initialisation de la classe d'animation
filterAnimation.addEventListeners();
