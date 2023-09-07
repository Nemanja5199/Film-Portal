import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePlus, faComment } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { checkRoleCookie } from '../../cookieUtils/cookieUtils'; // Import your checkRoleCookie function

const Hero = ({ movies }) => {
  const userRole = checkRoleCookie(); // Check the user's role

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
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                        </div>
                      </Link>

                      {/* Conditionally render the "Watchlist" button icon */}
                      {userRole === 'USER' && (
                        <Link to={`/watchList/`}>
                          <div className="watchlist-button-icon-container">
                            <FontAwesomeIcon className="watchlist-button-icon" icon={faCirclePlus} />
                          </div>
                        </Link>
                      )}

                      <Link to={`/Reviews/${movie.imdbId}`}>
                        <div className="comments-button-icon-container">
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
