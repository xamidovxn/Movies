"use strict"

movies.splice(50);

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

console.log(Allmovies);

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
                                 <strong>Year: </strong>
                              </li>
                              <li>
                                 <strong>Language: </strong>
                              </li>
                              <li>
                                 <strong>Rating: </strong>
                              </li>
                              <li>
                                 <strong>Category: </strong>
                              </li>
                              <li>
                                 <strong>Runtime: </strong>
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
                           </div>
       
      `;
      $('.wrapper').append(card)
   })
}

renderAllmovies()