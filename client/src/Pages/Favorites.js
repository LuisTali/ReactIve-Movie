import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modal";

const Favorites = ({user, favMovies}) =>{
    const [myList,setMyList] = useState(favMovies);
    const [isLoading,setIsLoading] = useState(true);
    const [favsList,setFavsList] = useState([]);
    let listMovies = [];

    const getData = async() =>{
        const response = await axios.post('/api/favs',{favMovies:myList});
        const data = response.data.favsList;
        console.log(data);
        setFavsList(data);
        listMovies = data;
    }

    useEffect(()=>{
        setMyList(favMovies);
        if(myList){
            getData();
            setIsLoading(false);
        }
    },[])

    return<>
        <div>
            <h2>Favorite Movies</h2>
            {isLoading && <Modal msg={'Loading...'}/>}
            {listMovies && <h4>jalala</h4>}
            {listMovies.map((movie)=>{
                <h2>{movie.original_title}</h2>
            })}
        </div>
    </>
}

export default Favorites;