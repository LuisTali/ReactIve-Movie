import React,{useState,useEffect} from 'react';
import Movie from './Movie';
import Pagination from '../Pagination';
import Modal from '../Modal';

const ListMovies = ({url}) =>{  //URL como parametro para que en base a la routa pedida, muestre las peliculas pedidas ya sea popular, nuevas, tendencia, etc.
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(true);
    const totalMovies = movies.length; //Cantidad de peliculas obtenidas con el fetch
    const [moviesPerPage,setMoviesPerPage] = useState(8); //Peliculas maximas mostradas por pagina
    const [page,setPage] = useState(1); //Valor default de la currentPage == 1
    
    //Al realizar slice al mapeado de las movies, solo muestro las peliculas del array que estan entre firstIndex y lastIndex
    const lastIndex = page * moviesPerPage;//Page 1 * 8 == 8
    const firstIndex = lastIndex - moviesPerPage;//Ultimo indice 8 - 8 == 0

    const getData = async() =>{
        const response = await fetch(url);
        const datos = await response.json();
        let movieList = datos.movieList;
        //movieList[2].vote_average = undefined; Para que propTypes default funcione, debe enviarse un valor sin definir, null lo toma como valor
        setPage(1);
        setMovies(movieList);
        setLoading(false);
    }
    
    useEffect(()=>{
        getData(); //Funcion se ejecuta solo en el primer renderizado gracias a [] en la lista de dependencias
    },[url]); //Al editarlo para que obtenga una URL y en base a eso realizar el fetch, debere colocar aqui url, para que al cambiar se re-renderice

    return<React.Fragment>
      {loading && <Modal msg='Loading...'/>} 
      <div className='listMovies'>
        {movies.map((movie) => {
            return <Movie movie={movie}/>
        }).slice(firstIndex,lastIndex)}
      </div>
      <Pagination totalMovies={totalMovies} moviesPerPage={moviesPerPage} currentPage={page} setCurrentPage={setPage}/>
    </React.Fragment>
  }

export default ListMovies;