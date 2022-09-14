const $ = (id) => document.querySelector(id);
const Cr = (element) => document.createElement(element);

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        'language': 'es-VE',
    },
});

const API ='https://api.themoviedb.org/3';
const trendingEndpoint = '/trending/movie/day';
const categories = '/genre/movie/list';
const URL_IMG = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMovies() {
    /*Scroll mouse horizontal*/
    const scrollContainer = $(".trendingMovie-list");

    scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

    const { data } = await api(trendingEndpoint);

    const movies = data.results;

    console.log({ data, movies });

    movies.forEach( movie => {
        const trendingMovieList = $('#trendingPreview .trendingMovie-list');
        const movieContainer = Cr('div');
        movieContainer.classList.add('movie-container');
        const movieImg = Cr('img');
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('src', URL_IMG + movie.poster_path);
        movieImg.setAttribute('alt', movie.title);

        trendingMovieList.appendChild(movieContainer);
        movieContainer.appendChild(movieImg)

    });
}

async function getCategories() {
    const { data } = await api(categories);

    const genre = data.genres;
    console.log({data, genre});

    genre.forEach( category => {
        const categoriesPreviewContainer = $('#categoriesPreview .categoriesPreview-list');
        
        const categoryContainer = Cr('div');
        categoryContainer.classList.add('category-container');
        const categoryTitle = Cr('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name == 'Suspense' ? category.name = 'Suspenso' : category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewContainer.appendChild(categoryContainer);

    })
}


getTrendingMovies();
getCategories();