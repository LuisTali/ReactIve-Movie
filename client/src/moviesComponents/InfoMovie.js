import React,{useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';

import Modal from '../Modal';
import Movie from "./Movie";

const InfoMovie = ({user,setUser}) =>{
    const baseUrl = 'http://localhost:5000/auth';
    const [alreadyInFav,setAlreadyInFav] = useState(false);
    const {id} = useParams();
    const [movie,setMovie] = useState({});
    const [relatedMovies,setRelatedMovies] = useState([]);
    const [loading,setLoading] = useState(true);
    const [showModal,setShowModal] = useState(false);
    const [modalContent,setModalContent] = useState("");

    const imgPath = 'https://image.tmdb.org/t/p/w500/';
    
    const getRelatedMovies = async() =>{
        const data = await fetch(`/api/related/${id}`);
        const relatedMovies = await data.json();
        setRelatedMovies(relatedMovies.moviesRelated.results);
    }

   

    const checkAlreadyInFav = () =>{
        let flag = false;
        if(user.favMovies){
            user.favMovies.map((movie) =>{
                if(movie === id){
                    flag = true; //En cada re-render si Id buscado coincide con los de la lista Favoritos se setea true
                    return;
                }
            })
            setAlreadyInFav(flag); //En base a la comparacion se setea si ya esta o no en la lista de Favs   
        }  
    }
    
    const getMovieById = async() =>{
        const data = await fetch(`/api/movie/${id}`);
        const movieFinded = await data.json();
        console.log(movieFinded.movie.genres);
        setMovie(movieFinded.movie);
        getRelatedMovies();
        setLoading(false);
    }

    const addToFavorite = async() =>{
        if(user.idUser){
            axios.post(baseUrl + '/addFav', {movie:{id:id, idUser:user.idUser}})
            let newUser = {...user};
            newUser.favMovies.push(id);
            setUser(newUser);
            setModalContent('Movie added to Favorites')
            setShowModal(true);
        }else{
            setModalContent('Register first')
            setShowModal(true);
        } 
    }

    const removeFromFavorite = async()=>{
        console.log('Removed');
        let response = await axios.post(baseUrl + '/removeFav', {id,idUser:user.idUser})
        let newFavList = response.data.movies;
        let newUser = {...user}; //Para forzar el re-render necesito setear el State con un objeto totalmente nuevo, por eso realizo este paso 
        newUser.favMovies = newFavList;
        setUser(newUser);
        setModalContent('Movie removed from Favorites')
        setShowModal(true);
    }

    useEffect(()=>{
        checkAlreadyInFav();
        getMovieById();
        getRelatedMovies();
    },[user,id]) //Al cliquear en una pelicula destacada obtiene el nuevo Id y fuerza el re-render
    
    if(loading){
        return  <Modal msg='Loading...'/>
    }
    return <>
    <div className="flexInfo">
        <img src={imgPath + movie.poster_path}/>
        <div className="infoMovie" key={id}>     
            <h2>{movie.original_title}</h2>
            <div className="subtitleInfo">
                <h5>{movie.release_date} ·  </h5>
                <ul className="genres">
                    {movie.genres.map((genre) => <li><h5 >{genre.name}</h5></li>)}
                </ul>
                <h5> ·{' '+ movie.vote_average.toFixed(2) + ' / 10' /*toFixed a 2 decimales*/}</h5> 
            </div>
                <h3>{movie.overview}</h3>
                {alreadyInFav ? <button id="manageFav" onClick={()=>removeFromFavorite()}> Remove from Favorite </button> : <button id="manageFav" onClick={()=>addToFavorite()}> Add to Favorite </button>} 
                {showModal && <Modal msg={modalContent} setShowModal={setShowModal}/>}
                <h5>Peliculas Relacionadas</h5>
        </div>    
        <div className="relatedMovies">
            <ul >
                {relatedMovies.map((related)=>{
                    return <li>
                        <Movie movie={related} related={true}/>
                    </li>
                })}
            </ul>
        </div>   
    </div>
    </>
}

export default InfoMovie;