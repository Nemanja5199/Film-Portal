import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePlus, faComment } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { checkRoleCookie, getCookie } from '../../cookieUtils/cookieUtils'; // 
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';

const Hero = ({ movies }) => {
  
  //Citanje kolacica
    const userRole = checkRoleCookie(); 
    const username = getCookie('username');
  
    
   
    //Funkcija za dodavanje u listu
    const addToWatchlist = async (imdbId) => {


      
      if (userRole === 'USER') {
        try {
         
          const userResponse = await api.get(`/api/v1/users/${username}`);
          const watchlist = userResponse.data.films.map((film) => film.imdbId);
    
          
          if (watchlist.includes(imdbId)) {

            
            toast.warning('Movie is already in the watchlist', {
              position: 'top-right',
              autoClose: 3000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            
            const response = await api.put(`/api/v1/films/updateUserListOfFilms?username=${username}&imdbId=${imdbId}`);
           
            console.log('Added to watchlist:', response.data);
    
            
            toast.success('Movie added to watchlist', {
              position: 'top-right',
              autoClose: 3000, // 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } catch (error) {
          
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

                  
                      {userRole === 'USER' && (
                        <div
                          className="icon-container" 
                          onClick={() => addToWatchlist(movie.imdbId)} 
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
