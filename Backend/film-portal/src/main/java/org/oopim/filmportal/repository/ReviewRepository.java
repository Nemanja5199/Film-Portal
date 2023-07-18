package org.oopim.filmportal.repository;

import org.bson.types.ObjectId;
import org.oopim.filmportal.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends MongoRepository<Review, ObjectId> {
}
