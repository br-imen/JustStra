// Specify the API endpoint for user data
const apiUrl = 'http://localhost:8000/api/v1/';

// Make a GET request using the Fetch API for movie by id
async function fetchDataMovieById(movieId){
  const response = await fetch(apiUrl+'titles/'+movieId);
  const data = await response.json();
  return data;
}

// Make a GET request using the Fetch API for movies outputs an array of 8 best movies filtred 
//by imdb score
async function fetchDataMovies(titleUrl){
  let arrayMovies = [];
  let nextPage = titleUrl; 
  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();
    const results = data.results;
    
    arrayMovies = arrayMovies.concat(results);
    if (arrayMovies.length < 7)
    {
      nextPage = data.next;
    }
    else{
      nextPage = null
    }
  } 
  return arrayMovies;
}

let titleUrl = apiUrl+'titles/'
titleUrl = titleUrl + '?sort_by=-imdb_score'


// Called function for movies to display all best rated movies (id,image)
fetchDataMovies(titleUrl).then(resultList => {
  // The first movie of that list is the best Movie
  let meilleurFilm = resultList[0]
  title = document.getElementById("title-best-movie")
  title.innerHTML= meilleurFilm.title
  const movieImage = document.querySelector(".best-movie");
  movieImage.setAttribute("src", meilleurFilm.image_url);
  movieImage.setAttribute("id",meilleurFilm.id);
  fetchDataMovieById(meilleurFilm.id).then(result => {
    description = document.querySelector(".bottom-left p");
    description.innerHTML = result.description
   })
  movieImage.addEventListener("click", function () {
    openModal(movieImage);
  });
  button = document.querySelector(".button-info");
  button.addEventListener("click", function () {
    openModal(movieImage);
  });
  // The rest of 8 movies are the seven best movies 
  let bestRatedMovies = resultList.slice(1, 8)
  let j = 0
  bestRatedMovies.forEach(movie => { 
    const listImages = document.querySelectorAll("#item-best-movies .item")
    listImages[j].setAttribute("src", movie.image_url);
    listImages[j].setAttribute("id", movie.id);
    j++;
    listImages.forEach(element => {
      element.addEventListener("click", function () {
        openModal(element);
    });
    });
  })

})


// Function to call to Get an array of categories 
async function fetchDataCategories(categoriesUrl){
  let arrayCategories = [];
  let nextPage = categoriesUrl;
  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();
    const results = data.results;
    arrayCategories = arrayCategories.concat(results);
    // I get 10 then I go to the next page to limit the time of waiting
    if (arrayCategories.length < 10)
    {
      nextPage = data.next;
    }
    else{
      nextPage = null
    }
  }
  return arrayCategories;
}

// Shuffle a list and get random num items
function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

// Get movies from 3 random categories and display 7 movies from each in carrosels.
// called fetchDataCategories to get a list of categories
// called fetchDataMovies to display movies of each categorie (set src of image and id)
let categoriesUrl = apiUrl+'genres/?page=2'
fetchDataCategories(categoriesUrl).then(resultList => {
    let categories = getMultipleRandom(resultList, 3);
    let categorieFields = document.querySelectorAll("h2.categorie")
    let dropdownCategorieFields = document.querySelectorAll("#myDropdown a")
    for(let i=0; i < 3; i++){
          categorieFields[i].innerHTML = categories[i].name;
          categorieFields[i].setAttribute("id", categories[i].name)
          dropdownCategorieFields[i].innerHTML = categories[i].name;
          dropdownCategorieFields[i].setAttribute("href","#"+categories[i].name)
          let categorieUrl = titleUrl + '&genre=' + categories[i].name
          fetchDataMovies(categorieUrl).then(listMovies => {
            let bestMovies = listMovies.slice(0,7)
            const listImages = document.querySelectorAll("#item-list"+i+" .item")
            // the condition  i < bestMovies.length : to display only movies that exist 
            for(let i=0; i <7; i++){
              if(i < bestMovies.length){
                listImages[i].setAttribute("src", bestMovies[i].image_url);
                listImages[i].setAttribute("id", bestMovies[i].id);
              }
              else{
                listImages[i].classList.add("hidden")
              }
            }
            listImages.forEach(element => {
              element.addEventListener("click", function () {
                openModal(element);
            });
            });

          })
     }

  })


// Scrolling carrosels:
const itemWidth = 350
const padding = 10

const prevListBestMovies = document.getElementById('prev-btn-best-movies');
const nextListBestMovies = document.getElementById('next-btn-best-movies');
const listBestMovies = document.getElementById('item-best-movies');

prevListBestMovies.addEventListener('click',()=>{
  listBestMovies.scrollLeft -= itemWidth + padding
});
nextListBestMovies.addEventListener('click',()=>{
  console.log('next : listBestMovies')
  console.log(listBestMovies)
  listBestMovies.scrollLeft += itemWidth + padding
})

  const prev0 = document.getElementById('prev-btn0');
  const prev1 = document.getElementById('prev-btn1');
  const prev2 = document.getElementById('prev-btn2');
  
  const next0 = document.getElementById('next-btn0');
  const next1 = document.getElementById('next-btn1');
  const next2 = document.getElementById('next-btn2');
  
  const list0 = document.getElementById('item-list0');
  const list1 = document.getElementById('item-list1');
  const list2 = document.getElementById('item-list2');

  prev1.addEventListener('click',()=>{
    list1.scrollLeft -= itemWidth + padding
  })
  next1.addEventListener('click',()=>{
    list1.scrollLeft += itemWidth + padding
  })
  prev2.addEventListener('click',()=>{
    list2.scrollLeft -= itemWidth + padding
  })
  next2.addEventListener('click',()=>{
    list2.scrollLeft += itemWidth + padding
  })

  prev0.addEventListener('click',()=>{
    list0.scrollLeft -= itemWidth + padding
  })
  next0.addEventListener('click',()=>{
    list0.scrollLeft += itemWidth + padding
  })

 // Work to optimaze scroll buttons:
      // prevButtonList = document.querySelectorAll(".prev-btn");
      // nextButtonList = document.querySelectorAll(".next-btn");
      // moviesScrollLists = document.querySelectorAll(".item-list");

      // prevButtonList.forEach(button => {
      //   button.addEventListener('click', function() {
      //     var MovieList = button.getAttribute('data-list-id');
      //     MovieList.scrollLeft -= itemWidth + padding;
      //   })
      // });
      
      // prevButtonList.forEach(button => {
      //   button.addEventListener('click', function() {
      //     var MovieList = button.getAttribute('data-list-id');
      //     MovieList.scrollLeft += itemWidth + padding;
      //   })
      // });




// Modal functionality:
// Modal appear on clicking the image how??
// 1. Have a list of all id images
// 2. Add an event to get the id on click
// 3. Fetch the data with called function fetchDataMovieById
// 4. Update the modal and display it with removing hidden
// 5. add hidden to close modal 
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const openModal = function (element) {
    tagsDoc = document.querySelectorAll('.modal p');
    img = document.querySelector('.modal img');
    id = element.id;
    fetchDataMovieById(id).then(result => {
        img.setAttribute("src", result.image_url)
        listData = [];
        listData.push(result.title)
        listData.push(result.genres)
        listData.push(result.date_published)
        listData.push(result.rated)
        listData.push(result.imdb_score)
        listData.push(result.directors)
        listData.push(result.actors)
        listData.push(result.duration)
        listData.push(result.countries)
        listData.push(result.worldwide_gross_income)
        listData.push(result.long_description)
        for (let i = 0; i < listData.length; i++ ) {
          tagsDoc[i].innerHTML = listData[i]
        }

        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    })
  
  };

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);


// script dropdown
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
const dropDownButton = document.querySelector(".dropbtn");
const myDropdown = document.getElementById("myDropdown");

const togglemyDropdown = function () {
  if (myDropdown.classList.contains('hidden')) {
    myDropdown.classList.remove('hidden');
  }
  else {
    myDropdown.classList.toggle('hidden');
  }
};
dropDownButton.addEventListener("click", togglemyDropdown);



