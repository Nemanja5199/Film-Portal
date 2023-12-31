// WatchList.js
import React, { useState, useEffect } from 'react';
import './WatchList.css'; // Import your CSS file
import api from '../../api/axiosConfig'; 
import { getCookie, checkRoleCookie } from '../../cookieUtils/cookieUtils'; 
import { Navigate } from 'react-router-dom';

const WatchList = () => {


    
  const userRole = checkRoleCookie();

  console.log(userRole);
  if (userRole === 'UnregUser') {
    return <Navigate to="/" />;
  }
  const [movies, setMovies] = useState([]);
  const username = getCookie('username'); 

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/v1/users/${username}`);

        // Extract imdbId, title, and poster from the films array
        const extractedMovies = response.data.films.map((film) => ({
          imdbId: film.imdbId,
          title: film.title,
          poster: film.poster,
        }));

        setMovies(extractedMovies);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchData();
  }, [username]);

  const removeFromWatchlist = async (imdbId) => {
    try {
     
      await api.delete(`/api/v1/films/deleteUserFilm?username=${username}&imdbId=${imdbId}`);

     
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.imdbId !== imdbId));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  return (
    <div className="watchlist">
      <h1>Your Watchlist</h1>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div className="movie-item" key={index}>
            <div className="poster">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="title">{movie.title}</div>
            <div className="remove-button">
              <button onClick={() => removeFromWatchlist(movie.imdbId)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
