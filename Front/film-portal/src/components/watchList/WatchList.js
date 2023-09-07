// WatchList.js
import React, { useState, useEffect } from 'react';
import './WatchList.css'; // Import your CSS file
import api from '../../api/axiosConfig'; // Import your Axios configuration
import { getCookie } from '../../cookieUtils/cookieUtils'; // Import your cookie utility function

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const username = getCookie('username'); // Get the username from the cookie

  useEffect(() => {
    // Make the request to get the user's data
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
      // Make the request to remove the movie from the user's watchlist
      await api.delete(`/api/v1/films/removeFromWatchlist?username=${username}&imdbId=${imdbId}`);

      // Update the movies state to reflect the removal
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
