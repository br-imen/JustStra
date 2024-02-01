# JustStreamIt



## Description:
It's a web application to view top rated movies filtred by imdb scores in real time.
We used a local API that called OCMovies-API that you can find on the following code repository  : https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR
The goal is to retrieve movies' data from this API using ajax requests and display them on a web interface.

## Implementation:
This version works with a local API, you should clone the repository https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR and then follow their instructions to run it with

```sh
python manage.py runserver
```

## Getting Started:
After running the api, you can just open the index.html file.
In the interface, you have the best rated movie as the main cover, then the best rated movies and some other categories displayed as an horizontal list that you can scroll right and left.
You can choose the category to go to from the navbar.
When you click on a movie, a modal will open with more information about the film, like title, actors ...


## Documentation:
The app is using vanilla javascript to fetch data from api using [Fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) looping over pagination.
For the categories, it will get random 3 categories from the api to work with. 


## Contributing:
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.


## Authors and acknowledgments
Special Thanks to my mentor and OpenClassrooms.