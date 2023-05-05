import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal";

const Favorites = ({user, favMovies}) =>{
    const [isLoading,setIsLoading] = useState(true);
    const [favsList,setFavsList] = useState([]);
    let listMovies = [];
    const imgPath = 'https://image.tmdb.org/t/p/w500/';
    
    const getData = async() =>{
        const response = await axios.post('/api/favs',{favMovies});
        const data = response.data.favsList;
        let result = data.filter((item,index)=>{
            return data.indexOf(item) === index;
        })
        setFavsList(result);
        setIsLoading(false); 
    }

    useEffect(()=>{
        if(favMovies){
            getData();      
        }
    },[favMovies,user])

    if(favMovies.length == 0){
        return <>
            <h2 style={{display:'flex', width:'100%', height:'400px ',justifyContent:'center',alignItems:'center'}}>Looks like this is quite empty</h2>
        </>
    }

    return<>
        <div>
            <h2 style={{textAlign:'center'}}>{`Favorite Movies of ${user.completeName}`}</h2>
            {isLoading && <Modal msg={'Loading...'}/>}
            <div className="scrollableFavs">
                <ul>
                {favsList.map((movie)=>{
                    return <li>
                        <div className='movie'>
                            <img src={imgPath + movie.poster_path} alt="poster_img"/>
                            <h2>{movie.original_title}</h2>
                            <h5>{movie.vote_average}/10</h5>
                            <Link to={`/movie/${movie.id}`}>Detalles</Link>
                        </div>
                    </li>
                })}
                </ul>
            </div>
        </div>
    </>
}

                


export default Favorites;