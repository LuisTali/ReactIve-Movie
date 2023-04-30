import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Movie = ({movie}) =>{
    const {original_title,id,poster_path,vote_average} = {...movie}
    const imgPath = 'https://image.tmdb.org/t/p/w500/'; //Api pide anexar esto al poster de cada pelicula

    return <div className='movie' key={id}>
      <h5>{id}</h5>
      <h4>{original_title}</h4>
      <img src={imgPath + poster_path}></img>
      <h6>{vote_average}</h6>
      <Link to={`/movie/${id}`}>Info</Link>
    </div>
}

Movie.propTypes={
    original_title:propTypes.string.isRequired,
    id:propTypes.number.isRequired,
    poster_path:propTypes.string.isRequired,
    vote_average:propTypes.number.isRequired
} 
Movie.defaultProps={
    vote_average:1
}

export default Movie;