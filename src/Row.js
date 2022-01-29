import React, { useEffect, useState } from "react"
import axios from "./axios";

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Row.css';

const base_images_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }){
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(()=>{
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      //console.table(request.data.results)
      setMovies(request.data.results)
      return request;
    }
    fetchData();
  },[fetchUrl])

  const opts = {
    height: "390",
    width: "100%",
    playerVars:{
      autoplay: 1
    }
  };

  const handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
      .then(url => {
        console.log(movie?.title || movie?.name || movie?.original_name);
        if (url != null) {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }
      })
      .catch((error) => console.log(error));
    }
  }

  return(
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        { movies.map( movie => {
          return (
            <img 
              className={`row_poster ${isLargeRow && "row_poster_large"}`}
              key={movie.id}
              onClick={()=>handleClick(movie)}
              src={base_images_url + (isLargeRow ? movie.poster_path : movie.backdrop_path)} 
              alt={movie.name}/>
          )
        })}
      </div>
      { trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/> }
    </div>
  )
}

export default Row