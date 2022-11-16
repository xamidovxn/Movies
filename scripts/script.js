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
                              <button class="btn text-light m-1 bg-danger">
                                 Trailers
                              </button>
                              <button class="btn text-light m-1 bg-success">

                                 Read more . . .
                              </button>
                              <button class="btn text-light m-1 bg-warning">
                                 Add bookmark
                              </button>
                           </div>`;
      $('.wrapper').append(card)
   })
}

renderAllmovies()


// -------------- FIND FILM FUNCTION ---------------- //

const findFilm = (regexp, filmRating) => {
   return Allmovies.filter((film) => {
      return film.title.match(regexp) && film.rating >= filmRating;
   })
}


$('#submitForm').addEventListener('submit', () => {

   $('.wrapper').innerHTML = `<div class="d-flex"><span class="loader"></span></div>`

   const searchValue = $('#filmName').value;
   const filmRating = $('#filmRating').value;
   const regexp = new RegExp(searchValue, "gi");

   const searchResult = findFilm(regexp, filmRating);

   setTimeout(() => {
      if (searchResult.length > 0) {
         searchRender(searchResult)
         $('.card-res').classList.remove('d-none')
         $('#res').innerHTML = `<strong>${searchResult.length} ta ma'lumot topildi! </strong>`

         if (searchValue.length === 0) {
            $('.card-res').classList.add('d-none')
         }

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
                              <button class="btn text-light m-1 bg-danger">
                                 Trailers
                              </button>
                              <button class="btn text-light m-1 bg-success">

                                 Read more . . .
                              </button>
                              <button class="btn text-light m-1 bg-warning">
                                 Add bookmark
                              </button>
                           </div>`;
      $('.wrapper').append(card)
   })
}





