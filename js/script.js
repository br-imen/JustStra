// Specify the API endpoint for user data
const apiUrl = 'http://localhost:8000/api/v1/';

// Make a GET request using the Fetch API for movie
async function fetchDataMovieById(movieId){
  const response = await fetch(apiUrl+'titles/'+movieId);
  const data = await response.json();
  return data;
}

// Make a GET request using the Fetch API for movies output an array of 8 movies filtred 
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

// Called function for movies to display all best rated movies
fetchDataMovies(titleUrl).then(resultList => {
// Best Movie
  let meilleurFilm = resultList[0]
  title = document.getElementById("title-best-movie")
  title.innerHTML= meilleurFilm.title
  const movieImage = document.querySelector(".best-movie");
  movieImage.setAttribute("src", meilleurFilm.image_url)
  movieImage.setAttribute("id",meilleurFilm.id)
    movieImage.addEventListener("click", function () {
      openModal(movieImage);
  });
// Seven best movies 
  let bestRatedMovies = resultList.slice(1, 8)
  let j = 0
  bestRatedMovies.forEach(movie => { 
    const list_images = document.querySelectorAll("#item-list1 .item")
    list_images[j].setAttribute("src", movie.image_url);
    list_images[j].setAttribute("id", movie.id);
    j++;
    list_images.forEach(element => {
      element.addEventListener("click", function () {
        openModal(element);
    });
    });
  })

})


// Function to Get all categories 
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





// Get three categories and print on html:
let categoriesUrl = apiUrl+'genres/'
fetchDataCategories(categoriesUrl).then(resultList => {
  let categories = resultList.slice(0,3);
  element1 = document.getElementById("categorie1");
  element2 = document.getElementById("categorie2");
  element3 = document.getElementById("categorie3");
  element1.innerHTML = categories[0].name;
  element2.innerHTML  = categories[1].name;
  element3.innerHTML  = categories[2].name;
  })


// Best movies by action categorie
 let movieActionUrl = titleUrl + '&genre=action'
 fetchDataMovies(movieActionUrl).then(listAction => {
  let bestActionMovies = listAction.slice(0, 7)
  const list_images = document.querySelectorAll("#item-list2 .item")
  for(let i=0; i <7; i++){
    if (i < bestActionMovies.length){
      list_images[i].setAttribute("src", bestActionMovies[i].image_url);
      list_images[i].setAttribute("id", bestActionMovies[i].id);
    }
    else{
      list_images[i].classList.add("hidden")
    }
  }
  list_images.forEach(element => {
    element.addEventListener("click", function () {
      openModal(element);
  });
  });

 })


   // Best movies by adult categorie
   let movieAdultUrl = titleUrl + '&genre=adult'
   fetchDataMovies(movieAdultUrl).then(listAdult => {
    let bestAdultMovies = listAdult.slice(0, 7)
    const list_images = document.querySelectorAll("#item-list3 .item")
    for(let i=0; i <7; i++){
      if (i < bestAdultMovies.length){
        list_images[i].setAttribute("src", bestAdultMovies[i].image_url);
        list_images[i].setAttribute("id", bestAdultMovies[i].id);
      }
      else{
        list_images[i].classList.add("hidden")
      }
    }
    list_images.forEach(element => {
      element.addEventListener("click", function () {
        openModal(element);
    });
    });

   })
  

     // Best movies by adventure categorie
     let movieAdventureUrl = titleUrl + '&genre=adventure'
     fetchDataMovies(movieAdventureUrl).then(listAdventure => {
      let bestAdventureMovies = listAdventure.slice(0, 7)
      const list_images = document.querySelectorAll("#item-list4 .item")
      for(let i=0; i <7; i++){
        if (i < bestAdventureMovies.length){
          list_images[i].setAttribute("src", bestAdventureMovies[i].image_url);
          list_images[i].setAttribute("id", bestAdventureMovies[i].id);
        }
        else{
          list_images[i].classList.add("hidden")
        }
      }
      list_images.forEach(element => {
        element.addEventListener("click", function () {
          openModal(element);
      });
      });
      
     })


// Scrolling carrosels:
  const prev1 = document.getElementById('prev-btn1');
  const prev2 = document.getElementById('prev-btn2');
  const prev3 = document.getElementById('prev-btn3');
  const prev4 = document.getElementById('prev-btn4');
  const next1 = document.getElementById('next-btn1');
  const next2 = document.getElementById('next-btn2');
  const next3 = document.getElementById('next-btn3');
  const next4 = document.getElementById('next-btn4');
  const list1 = document.getElementById('item-list1');
  const list2 = document.getElementById('item-list2');
  const list3 = document.getElementById('item-list3');
  const list4 = document.getElementById('item-list4');
  const itemWidth = 350
  const padding = 10
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
  prev3.addEventListener('click',()=>{
    list3.scrollLeft -= itemWidth + padding
  })
  next3.addEventListener('click',()=>{
    list3.scrollLeft += itemWidth + padding
  })
  prev4.addEventListener('click',()=>{
    list4.scrollLeft -= itemWidth + padding
  })
  next4.addEventListener('click',()=>{
    list4.scrollLeft += itemWidth + padding
  })



// Modal functionality:
// Modal appear on clicking the image how??
// have a list of all id images
// add an event to get the id on click
// to fetch the data 
// to update the modal
// to modify hidden


const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");


const openModal = function (element) {
    tagsDoc = document.querySelectorAll('.modal p');
    title = document.querySelector('.modal h3');
    img = document.querySelector('.modal img');
    id = element.id;
    console.log("id _______")
    console.log(id)
    fetchDataMovieById(id).then(result => {
        //listData.push(result[0].image_url)
        //listData.push(result[0].title)
        console.log("result *****")
        console.log(result)
        title.innerHTML = result.title
        img.setAttribute("src", result.image_url)

        listData = [];
        listData.push(result.genres)
        listData.push(result.date_published)
        listData.push(result.rated)
        listData.push(result.imdb_score)
        listData.push(result.directors)
        listData.push(result.actors)
        listData.push(result.duration)
        listData.push(result.countries)
        listData.push(result.usa_gross_income)
        listData.push(result.long_description)

        console.log("listData #######")
        console.log(listData)
        for (let i = 0; i < listData.length; i++ ) {
          console.log(listData[i])
          console.log(tagsDoc[i])
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

