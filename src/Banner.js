import React, { useEffect, useState } from "react";
import axios from './axios';
import requests from './requests';

import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const index = Math.floor(Math.random() * request.data.results.length - 1);
      setMovie(request.data.results[index]);
      console.log(request.data.results[index]);
      return (request.data.results[index]);
    }
    fetchData();
  },[]);
  
  function truncate(str,n) {
    return str?.length > n ? str.substr(0,n-1) + "..." : str;
  }

  return (
    <header className="banner"
      style={{
        backgroundSize : "cover",
        backgroundImage : `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition : "center center"
      }}>
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {truncate(movie?.overview,180)}
        </h1>
      </div>

      <div className="banner--fadebottom"/>
    </header>
  )
}

export default Banner;