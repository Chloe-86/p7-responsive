class FactoryCard {
  constructor(recipeContainer) {
      this.recipeContainer = recipeContainer;
      
  }
  createWrapper() {
    const div = document.createElement('div');
    div.classList.add('card-wrapper');
    return div;
}
  createDivCol() {
    const div = document.createElement('div');
    div.classList.add('col-lg-4', 'mb-5');
    return div;
}
  createArticle() {
      const article = document.createElement('article');
      article.classList.add('card');
      return article;
  }

  createImage(imagePath) {
      const img = document.createElement('img');
      img.src = imagePath;
      img.classList.add('card-img-top');
      img.alt = name;
      return img;
  }

  createHeader(name) {
      const headerDiv = document.createElement('div');
      headerDiv.classList.add('card-header', 'bg-white', 'border-0');
      const headerTitle = document.createElement('h2');
      headerTitle.classList.add('card-header-title');
      headerTitle.textContent = name;
      headerDiv.appendChild(headerTitle);
      return headerDiv;
  }

  createBody(description) {
      const bodyDiv = document.createElement('div');
      bodyDiv.classList.add('card-body');
      const cardTitle = document.createElement('h3');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = 'recette';
      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = description;
      bodyDiv.appendChild(cardTitle);
      bodyDiv.appendChild(cardText);
      return bodyDiv;
  }

  createFooter(name, ingredients) {
      const footerDiv = document.createElement('div');
      footerDiv.classList.add('card-footer', 'bg-white', 'border-0');
      footerDiv.style.borderRadius = '21px';
      const footerTitle = document.createElement('h3');
      footerTitle.classList.add('card-title');
      footerTitle.textContent = name;
      footerDiv.appendChild(footerTitle);
      const cardIngredients = this.createCardIngredients(ingredients);
      footerDiv.appendChild(cardIngredients);
      return footerDiv;
  }

  createCardIngredients(ingredients) {
      const cardIngredients = document.createElement('div');
      cardIngredients.classList.add( 'ingredients','d-flex', 'flex-wrap');
      ingredients.forEach(ingredient => {
          const row = document.createElement('div');
          row.classList.add('row');
          const rowInner = document.createElement('div');
          rowInner.classList.add('row');
          const h4 = document.createElement('h4');
          h4.textContent = ingredient.ingredient;
          const p = document.createElement('p');
          p.textContent = ingredient.quantity;
          row.appendChild(h4);
          row.appendChild(p);
          cardIngredients.appendChild(row);
      });
      return cardIngredients;
  }

  renderCard(name, description, ingredients, imagePath) {
      const div = this.createDivCol();
      const wrapper = this.createWrapper();
      const article = this.createArticle();
      const img = this.createImage(imagePath);
      article.appendChild(img);
      const headerDiv = this.createHeader(name);
      wrapper.appendChild(headerDiv);
      const bodyDiv = this.createBody(description);
      wrapper.appendChild(bodyDiv);
      const footerDiv = this.createFooter('Ingrédients', ingredients);
      wrapper.appendChild(footerDiv);
      article.appendChild(wrapper);
      div.appendChild(article);
      this.recipeContainer.appendChild (div);
  }
  
}