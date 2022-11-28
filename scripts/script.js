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
});


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
                              <a class="btn text-light m-1 bg-success" data-success="${el.id}">
                                 Read more
                              </a>
                              <a class="btn text-light m-1 bg-warning" data-danger="${el.id}">
                                 Add bookmark
                              </a>
                           </div>`;
      $('.wrapper').appendChild(card)
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
                        </div>`
      $('.wrapper').append(card)
   })
}

// -------------------- SHOW MODAL ---------------------- //

$('.read__more').addEventListener('click', (e) => {
   $('.read__body').innerHTML = "";
   if (e.target.classList.contains("bg-danger")) {
      $('.read__more').classList.add('swipe');
   }
})

const closeIcon = () => {
   $('.wrapper').addEventListener('click', (e) => {
      if (e.target.classList.contains("bg-success")) {
         $('.read__more').classList.remove('swipe');
         const id = e.target.getAttribute("data-success");
         BtniD(id);
      }
   })
}
closeIcon();

// ------------------------------ READ MORE ============================== //

function BtniD(id) {
   const btn = Allmovies.filter(item => {
      return item.id == id;
   });
   RenderId(btn);
}

function RenderId(data = []) {
   data.forEach((el) => {
      const card = document.createElement('div');
      card.classList.add('card', 'shadow');
      card.innerHTML =

         `<div class="d-flex read">
         <img src="${el.minImg}" alt="img" width="100">
         
         <div class="p-2>
            <h4 class="card__title"> <strong>Title: </strong> ${el.title} </h4>

         <ul class="list-unstyled">
            <li>
               <strong>Year: </strong> ${el.year};
            </li>

            <li>
               <strong>Language: </strong> ${el.lang};
            </li>

            <li>
               <strong>Rating: </strong> ${el.rating};
            </li>

            <li>
               <strong>Categories: </strong> ${el.categories};
            </li>

            <li>
               <strong>Time: </strong> ${el.time};
            </li>

            <li>
               <strong>Summary: </strong> ${el.summary}
            </li>
            
         </ul>
      </div>
   </div>`

      $('.read__body').appendChild(card);

   });
}

//  -------------------------- BOOKMARK ------------------------ //

const bookmark =[];

$('.wrapper').addEventListener('click', (e) => {
   if (e.target.classList.contains('bg-warning')) {
      $('.bookmark').classList.remove('swipe');
      const id = e.target.getAttribute('data-danger');
      BtniD(id);
   }

   function BtniD(id) {
      const datas = Allmovies.filter(item => {
         return item.id == id;
      });
      bookmarkId(datas);
   }

})

function bookmarkId(data = []) {
   data.forEach((el) => {
      const div = document.createElement('div')
      div.classList.add('shadow', 'card')
      div.innerHTML = `
      
      <div class="d-flex read">
      <img src="${el.minImg}" alt="img" style="width: 150px; height: 150px">
      
      <div class="p-2">
         <h4 class="card__title"> <strong>Title: </strong> ${el.title} </h4>

      <ul class="list-unstyled list-group">
         <li class="list-group-item">
            <strong>Year: </strong> ${el.year};
         </li>

         <li class="list-group-item">
            <strong>Language: </strong> ${el.lang};
         </li>

         <li class="list-group-item">
            <strong>Rating: </strong> ${el.rating};
         </li>

         <li class="list-group-item">
            <strong>Categories: </strong> ${el.categories};
         </li>

         <li class="list-group-item">
            <strong>Time: </strong> ${el.time};
         </li>

         <li class="list-group-item">
            <strong>Summary: </strong> ${el.summary}
         </li>
         
      </ul>
   </div>
</div> `;

      $('.bookmark-box').appendChild(div);
   });
}

$('.bookmark__close').addEventListener('click', (e) => {
   $('.bookmark-box').innerHTML = "";

   if (e.target.classList.contains('bookmark__close')) {
      $('.bookmark').classList.add('swipe');
   }
})

// ------- animate css example ----------------- //

// $('.olga').addEventListener('click', (e) => {
//    $('.bookmark__close').classList.add('animate')
// })
