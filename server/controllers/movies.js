
const apiKey = '8fba4011ed49944a422caacc8baf398a';

export const getLatestMovies = async(req,res)=>{ //Obtengo las peliculas actuales en Teatros
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    const movieList = data.results;
    res.json({success:true,movieList})
};

export const getPopularMovies = async(req,res)=>{ //Obtengo las peliculas mas populares
    let movieList = [];
    for(let i = 1; i < 3; i++){ //Obtengo las dos primeras paginas de peliculas Populares
        const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${i}`);
        const movies = await data.json();
        const moviesList = movies.results; //Obtengo la lista de peliculas de la pagina i
        movieList.push(...moviesList); //Pusheo las peliculas de la pagina i al arreglo de movies general
    }
    res.json({success:true,movieList:movieList})
};

export const getMovieById = async(req,res)=>{
    const {id} = req.params;
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
    const movie = await data.json();
    res.json({success:true,movie})
};

export const getRelatedMovies = async(req,res)=>{
    const {id} = req.params;
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`);
    const moviesRelated = await data.json();
    res.json({moviesRelated})
}
