import React, { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import { getCookie } from '../../cookieUtils/cookieUtils';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
  const username = getCookie('username');
  const userRole = getCookie('role');
  

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  
  const handleRemoveComment = async (id) => {
    try {
      
      console.log(id);
      const response = await api.delete(`/api/v1/reviews/${movieId}/${id}?username=${username}`);
      if (response.status === 200) {


        
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
      }
    } catch (err) {
      console.error(err);
    } 
  };

  const addReview = async (e) =>{
    e.preventDefault();

    const rev = revText.current;

    try
    {
        const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});
        console
        

        const updatedReviews = [...reviews, {body:rev.value}];

        rev.value = "";

        setReviews(updatedReviews);
    }
    catch(err)
    {
        console.error(err);
    }
    



}

    return (
      <Container>
        <Row>
          <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <img src={movie?.poster} alt="" className="img-fluid rounded" />
          </Col>
          <Col>
            <Row>
              <Col>
                {userRole === 'USER' && (
                  <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
            {reviews?.map((r, index) => (
              <div key={index}>
                <Row>
                  <Col>{r.body}</Col>
                  {userRole === 'ADMIN' && (
                    <Col className="text-right">
                      <Button variant="danger" onClick={() => handleRemoveComment(r.id)}>Remove</Button>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
      </Container>
    )
  }
  
  export default Reviews;
