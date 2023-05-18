const apiKey = '8fba4011ed49944a422caacc8baf398a';

export const getLatestMovies = async(req,res)=>{ //Obtengo las peliculas actuales en Teatros
    let movieList = [];
    for(let i = 1; i < 5; i++){
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${i}`);
        const data = await response.json();
        const moviesList = data.results;
        movieList.push(...moviesList);
    }
    res.json({success:true,movieList})
};

export const getPopularMovies = async(req,res)=>{ //Obtengo las peliculas mas populares
    let movieList = [];
    for(let i = 1; i < 5; i++){ //Obtengo las dos primeras paginas de peliculas Populares
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

export const chargeMyList = async(req,res)=>{
    const {favMovies} = req.body;
    const movies = [];
    for(const idMovie of favMovies){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=${apiKey}&language=en-US`);
        const data = await response.json();
        const movie = {
            original_title: data.original_title,
            poster_path:data.poster_path,
            id: data.id,
            vote_average: data.vote_average,
            overview: data.overview
        }
        movies.push(movie)
        
    }
    res.json({success:true,favsList:movies})
}
