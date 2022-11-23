const $ = function (selector) {
   return document.querySelector(selector)
}

const $$ = function (selector) {
   return document.querySelectorAll(selector)
}

// ======================= DYNAMIC CREATE_ELEMENT =========================== //

const createElement = (nameTag, nameClass, content) => {
   const div = document.createElement(nameTag, nameClass, content);

   if (nameClass) {
      div.setAttribute('class', nameClass)
   } else {
      console.warn('fill class attribute')
   }

   if (content) {
      div.innerHTML = `${content}`
   } else {
      console.warn('fill HTML content')
   }

   return div;
}