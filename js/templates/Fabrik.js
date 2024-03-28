// class Fabrik {
//   constructor() {
//     this.body = document.querySelector("body");
//     this.header = document.querySelector("header")
//     this.section = document.querySelector("main section");
//   }
//   createElement(element){
//     document.createElement(element);
//   }
//   addClassElement(element, className) {
//     element.classList.add(className);
//   }
//   addAttributElement(element, attributes) {
//     element.setAttributes.add(attributes);
//   }
//   attachElement(element, targetElement) {
//     targetElement.appendChild(element);
//   }

//   // creation d image
//   renderImg(image, source, attributes, targetElement){
//     this.img = document.createElement("img");
//     this.img.classList.add(image);
//     this.img.src = source;
//     this.img.setAttribute("alt", attributes);
//     this.attachElement(element, targetElement) 
//    }
// // creation d'un a 
//   renderA(attributes, targetElement){
//     this.a = document.createElement("a");
//     this.a.setAttribute("href", attributes);
//     this.attachElement(this.a, targetElement) 
//   }

//   renderTitle(elt, text, priorityNumber, targetElement) {
//     this.elt = document.createElement(elt);
//     this.elt.textContent = text;
//     this.elt.setAttribute("tabindex", priorityNumber);
//     this.attachElement(this.elt, targetElement) 
//   }

// // attachement au dom 
//   createAndAttachElement(elementType, className, targetElement = this.body) {
//     const element = this.createElement(elementType);
//     if (className) {
//       this.addClassElement(element, className);
//     }
//     if (targetElement) {
//         targetElement.appendChild(element);
//       }
//       return element;
//   }

// }

// class SuperFabrikUtils extends Fabrik {
//   constructor() {
//     super();
//   }

//   // renderFilter(elt,className, text, priorityNumber, targetElement, attributes){
//   //   const article = this.createAndAttachElement(elt, className, targetElement)
//   //   this.renderTitle(elt, text, priorityNumber, article);
//   // }

//   renderCard(elt, text, priorityNumber, targetElement, attributes, className){
//     const article = this.createAndAttachElement('article', className, targetElement)
//     this.renderA(attributes, article);
//     this.renderTitle(elt, text, priorityNumber, article);
//   }
 
// }



// const superFabrikUtils = new SuperFabrikUtils();
// superFabrikUtils.renderCard('p', 'titre','1', superFabrikUtils.section, '#a', "card");
// // superFabrikUtils.renderFilter('div', 'select', null, '0' ,superFabrikUtils.header, '#a');
