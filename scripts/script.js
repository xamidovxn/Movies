"use strict"

movies.splice(10);

const Allmovies = movies.map((movies) => {
   return {
      title: movies.title,
      year: movies.year,
      lang: movies.language,
      categories: movies.categories,
      id: movies.imdbId,
      time: `${Math.floor(movies.runtime / 60)}H ${movies.runtime % 60}M`,
      summary: movies.summary,
      link: `https://www.youtube.com/embed/${movies.youtubeId}`,
      maxImg: movies.bigThumbnail,
      minImg: movies.smallThumbnail,
      rating: movies.imdbRating
   }
})

function renderAllmovies() {
   Allmovies.forEach((el) => {
      const card = document.createElement('div');
      card.classList.add('shadow-lg', 'card');
      card.innerHTML = `
                        <img src="${el.minImg}" alt="img" class="card__img">
                        <div class="card__body p-2">
                           <h4 class="card__title">
                              ${el.title}
                           </h4>
                           <ul class="list-unstyled">
                              <li>
                                 <strong>Year:</strong> ${el.year} 
                              </li>
                              <li>
                                 <strong>Language:</strong> ${el.lang} 
                              </li>
                              <li>
                                 <strong>Rating:</strong> ${el.rating} 
                              </li>
                              <li>
                                 <strong>Category:</strong> ${el.categories} 
                              </li>
                              <li>
                                 <strong>Runtime:</strong> ${el.time} 
                              </li>
                           </ul>

                           <div class="social d-flex">
                              <a href="${el.link}" target="_blank" class="btn text-light m-1 bg-danger
                              ">
                                 Trailers
                              </a>
                              <a class="btn text-light m-1 bg-success">
                                 Read more
                              </a>
                              <a class="btn text-light m-1 bg-warning">
                                 Add bookmark
                              </a>
                           </div>`;
      $('.wrapper').append(card)
   })
}

renderAllmovies();


// --------------- DYNAMIC CATEGORIES ------------------ //

const dynamicCategory = () => {
   let category = [];

   Allmovies.forEach((e) => {
      e.categories.forEach((el) => {
         if (!category.includes(el)) {
            category.push(el);
         }
      });
   });

   category.sort();
   category.unshift('All')
   category.forEach((el) => {
      const option = createElement('option', 'item-option', el);
      $('#category').appendChild(option);
   });
}

dynamicCategory()


// -------------- FIND FILM FUNCTION ---------------- //

const findFilm = (regexp, rating = 0, category) => {

   if (category === 'All') {
      return Allmovies.filter((film) => {
         return film.title.match(regexp) && film.rating >= rating;
      })
   }

   return Allmovies.filter((film) => {
      return film.title.match(regexp) && film.rating >= rating && film.categories.includes(category);
   })
}


$('#submitForm').addEventListener('submit', () => {

   $('.wrapper').innerHTML = `<div class="d-flex"><span class="loader"></span></div>`

   const searchValue = $('#filmName').value;
   const filmRating = $('#filmRating').value;
   const filmCategory = $('#category').value;

   const regexp = new RegExp(searchValue, "gi");

   const searchResult = findFilm(regexp, filmRating, filmCategory);

   setTimeout(() => {
      if (searchResult.length > 0) {
         searchRender(searchResult)
         $('.card-res').classList.remove('d-none')
         $('#res').innerHTML = `<strong>${searchResult.length} ta ma'lumot topildi! </strong>`

      } else {
         $('#res').innerHTML = `<strong>${searchResult.length} ta ma'lumot topildi! </strong>`
         $('.wrapper').innerHTML = `<h1 class="text-danger">MA'LUMOT TOPILMADI!</h1>`;
      }
   }, 2000);

})

function searchRender(data = []) {

   $('.wrapper').innerHTML = "";

   data.forEach((el) => {
      const card = document.createElement('div');
      card.classList.add('shadow-lg', 'card')
      card.innerHTML = `
                        <img src="${el.minImg}" alt="img" class="card__img">
                        <div class="card__body p-2">
                           <h4 class="card__title">
                              ${el.title}
                           </h4>
                           <ul class="list-unstyled">
                              <li>
                                 <strong>Year: ${el.year} </strong>
                              </li>
                              <li>
                                 <strong>Language: ${el.lang} </strong>
                              </li>
                              <li>
                                 <strong>Rating: ${el.rating} </strong>
                              </li>
                              <li>
                                 <strong>Category: ${el.categories} </strong>
                              </li>
                              <li>
                                 <strong>Runtime: ${el.time} </strong>
                              </li>
                           </ul>

                           <div class="d-flex">
                           <a href="${el.link}" target="_blank" class="btn text-light m-1 bg-danger
                           ">
                              Trailers
                           </a>
                           <a class="btn text-light m-1 bg-success">
                              Read more
                           </a>
                           <a class="btn text-light m-1 bg-warning">
                              Add bookmark
                           </a>
                           </div>`;
      $('.wrapper').append(card)
   })
}

$('.wrapper').addEventListener('click', (e) => {
   if (e.target.classList.contains("bg-success")) {
      console.log(e.target.textContent);
   }
})



