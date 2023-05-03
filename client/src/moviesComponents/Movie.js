import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Movie = ({movie,related}) =>{
    const {original_title,id,poster_path,vote_average} = {...movie}
    const imgPath = 'https://image.tmdb.org/t/p/w500/'; //Api pide anexar esto al poster de cada pelicula

    return <div className={related ? 'relatedMovieAttributos' : 'movie'} key={id}>
      <h4>{original_title}</h4>
      <img src={imgPath + poster_path} alt='posterImg' />
      <h6>{vote_average}</h6>
      <Link to={`/movie/${id}`}>Detalles</Link>
    </div>
}

Movie.propTypes={
    original_title:propTypes.string.isRequired,
    id:propTypes.number.isRequired,
    poster_path:propTypes.string.isRequired,
    vote_average:propTypes.number.isRequired
} 
Movie.defaultProps={
    id:1,
    poster_path:'noPoster',
    original_title:'defaultTitle',
    vote_average:1
}

export default Movie;