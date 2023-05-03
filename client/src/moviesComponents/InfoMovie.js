import React,{useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';

import Modal from '../Modal';
import Movie from "./Movie";

const InfoMovie = ({idUser,email}) =>{
    const baseUrl = 'http://localhost:5000/auth';
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

    const getMovieById = async() =>{
        const data = await fetch(`/api/movie/${id}`);
        const movieFinded = await data.json();
        setMovie(movieFinded.movie);
        getRelatedMovies();
        setLoading(false);
    }

    const addToFavorite = async() =>{
        console.log(`${idUser} del user ${email}`); //Para comprobar que llegan bien los datos del user
        if(idUser){
            axios.post(baseUrl + '/addFav', {movie:{id:id, idUser:idUser}})
            setModalContent('Movie added to fav')
            setShowModal(true);
        }else{
            setModalContent('Register first')
            setShowModal(true);
        } 
    }

    useEffect(()=>{
        getMovieById();
        getRelatedMovies;
        setTimeout(()=>{
            setShowModal(false);
        },3000)
    },[id,showModal]) //Al cliquear en una pelicula destacada obtiene el nuevo Id y fuerza el re-render
    
    if(loading){
        return  <Modal msg='Loading...'/>
    }
    return <>
    <div className="flexInfo">
        <img src={imgPath + movie.poster_path}/>
        <div className="infoMovie" key={id}>     
                <h2>{movie.original_title}</h2>
                <h3>{movie.overview}</h3>
                <h5>{movie.release_date}</h5>
                <span>{movie.vote_average + ' / 10'}</span>
                <button id="addFav" onClick={addToFavorite}> Add to Favorite </button>
                <h5>Peliculas Relacionadas</h5>
                {showModal && <Modal msg={modalContent}/>}
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