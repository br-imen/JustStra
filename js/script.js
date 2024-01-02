// Specify the API endpoint for user data
const apiUrl = 'http://localhost:8000/api/v1/';

let titleUrl = apiUrl+'titles/'
titleUrl = titleUrl + '?sort_by=-imdb_score'

// Make a GET request using the Fetch API for movies
async function fetchData(titleUrl){
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

// Called function for movies to display all best rated movies
fetchData(titleUrl).then(resultList => {
  console.log(resultList);
  
  let meilleurFilm = resultList[0]
  console.log("meilleurFilm: ")
  console.log(meilleurFilm)
  
  let bestRatedMovies = resultList.slice(1, 8)
  console.log("bestRatedMovies: ")
  console.log(bestRatedMovies)
  const movieSection = document.querySelector(".best_movie");
  var movieDiv = document.createElement("div");

  movieDiv.innerText = meilleurFilm.title;
  movieSection.appendChild(movieDiv)
  
  const moviesSection = document.querySelector(".best_rated_movies");
  bestRatedMovies.forEach(movie => {
    var movieDiv = document.createElement("div");

    movieDiv.innerText = movie.title;
    moviesSection.appendChild(movieDiv)
  });
})
.catch(error => { console.error ('Error:',error)});


// get all categories

async function fetchDataCategories(categoriesUrl){
  let arrayCategories = [];
  let nextPage = categoriesUrl;

  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();
    const results = data.results;

    arrayCategories = arrayCategories.concat(results);
    if (arrayCategories.length < 3)
    {
      nextPage = data.next;
    }
    else{
      nextPage = null
    }
  }

  return arrayCategories;
}

let categoriesUrl = apiUrl+'genres/'

fetchDataCategories(categoriesUrl).then(resultList => {

  let categories = resultList.slice(0,3)
  console.log("categories");
  console.log(categories);
  const categoriesSection = document.querySelector(".categories");
  categories.forEach(categorie => {
    var categorieDiv = document.createElement("div");

    categorieDiv.innerHTML = "<h2>" + categorie.name + "<h2>";
    categoriesSection.appendChild(categorieDiv)
  });
})
.catch(error => { console.error ('Error:',error)});