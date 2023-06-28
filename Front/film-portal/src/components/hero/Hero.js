import { Paper } from '@mui/material'
import  Carousel  from 'react-material-ui-carousel'
import React from 'react'
import'./Hero.css'

const Hero = ({movies}) => {

  if (!Array.isArray(movies)) {
    return null; // or display an error message
  }
  
  return (
    <div className='movie-carousel-container'>
       <Carousel>
        {
          movies.map((movie) =>{
            return(

              <Paper key={movie.id} elevation={3}>
              <div className="movie-card-container">
                <div className="movi-card">
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>

                    <div className="movie-title">
                      <h4>{movie.title}</h4>
                    </div>
                  </div>
                </div>
              </div>

          </Paper>

            )
          })
        }
       </Carousel>
    

      
    </div>
  )
}

export default Hero
