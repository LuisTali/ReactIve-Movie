import React,{useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import Modal from './Modal';

const InfoMovie = () =>{
    const {id} = useParams();
    const [movie,setMovie] = useState({});
    const [relatedMovies,setRelatedMovies] = useState([]);
    const [loading,setLoading] = useState(true);

    const imgPath = 'https://image.tmdb.org/t/p/w500/';
    
    const getRelatedMovies = async() =>{
        const data = await fetch(`/api/related/${id}`);
        const relatedMovies = await data.json();
        console.log(relatedMovies.moviesRelated.results);
        setRelatedMovies(relatedMovies.moviesRelated.results);
    }

    const getMovieById = async() =>{
        const data = await fetch(`/api/movie/${id}`);
        const movieFinded = await data.json();
        setMovie(movieFinded.movie);
        getRelatedMovies();
        setLoading(false);
    }

    useEffect(()=>{
        getMovieById();
        getRelatedMovies
    },[])
    if(loading){
        return  <Modal msg='Loading...'/>
    }
    return <div className="infoMovie" key={id}>
        <img src={imgPath + movie.poster_path}/>
        <div >
            <div className="textInfo"> 
            <h3>{movie.original_title}</h3>
            <h4>{movie.overview}</h4>
            <h5>{movie.release_date}</h5>
            <span>{movie.vote_average + ' / 10'}</span>
            </div>
            
            <div className="relatedMovies">
            <ul >
                {relatedMovies.map((related)=>{
                    return <li>
                        <p>{related.title}</p>
                    </li>
                })}
            </ul>
            </div>
            
        </div>
    </div>
}

export default InfoMovie;