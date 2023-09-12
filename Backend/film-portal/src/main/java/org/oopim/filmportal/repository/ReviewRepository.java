package org.oopim.filmportal.repository;

import org.bson.types.ObjectId;
import org.oopim.filmportal.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends MongoRepository<Review, ObjectId> {

    Optional<Review> deleteReviewById(ObjectId id);
}
