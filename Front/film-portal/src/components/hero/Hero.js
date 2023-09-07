import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePlus, faComment } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { checkRoleCookie, getCookie } from '../../cookieUtils/cookieUtils'; // Import your checkRoleCookie function
import api from '../../api/axiosConfig'; // Import your Axios configuration
import { toast } from 'react-toastify';

const Hero = ({ movies }) => {
    const userRole = checkRoleCookie(); // Check the user's role
    const username = getCookie('username');
  
    // Function to handle adding to the watchlist
   
    
    const addToWatchlist = async (imdbId) => {
      // Check if the user is logged in and has the 'USER' role
      if (userRole === 'USER') {
        try {
          // Get the user's watchlist
          const userResponse = await api.get(`/api/v1/users/${username}`);
          const watchlist = userResponse.data.films.map((film) => film.imdbId);
    
          // Check if the movie is already in the watchlist
          if (watchlist.includes(imdbId)) {
            // Movie is already in the watchlist, display a notification
            toast.warning('Movie is already in the watchlist', {
              position: 'top-right',
              autoClose: 3000, // Close the notification after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            // Movie is not in the watchlist, add it
            const response = await api.put(`/api/v1/films/updateUserListOfFilms?username=${username}&imdbId=${imdbId}`);
            // Handle the response if needed
            console.log('Added to watchlist:', response.data);
    
            // Display a success message
            toast.success('Movie added to watchlist', {
              position: 'top-right',
              autoClose: 3000, // Close the notification after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } catch (error) {
          // Handle errors if the request fails
          console.error('Error adding to watchlist:', error);
        }
      }
    };
    
  return (
    <div className='movie-carousel-container'>
      <Carousel>
        {movies?.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className='movie-card-container'>
                <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>
                    <div className="movie-title">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                      <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                        <div className="icon-container">
                          <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                        </div>
                      </Link>

                      {/* Conditionally render the "Watchlist" button icon */}
                      {userRole === 'USER' && (
                        <div
                          className="icon-container" 
                          onClick={() => addToWatchlist(movie.imdbId)} // Pass the IMDb ID to the handler
                        >
                          <FontAwesomeIcon className="watchlist-button-icon" icon={faCirclePlus} />
                        </div>
                      )}

                      <Link to={`/Reviews/${movie.imdbId}`}>
                        <div className="icon-container">
                          <FontAwesomeIcon className="comments-button-icon" icon={faComment} />
                        </div>
                      </Link>

                      <div className="movie-review-button-container"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
