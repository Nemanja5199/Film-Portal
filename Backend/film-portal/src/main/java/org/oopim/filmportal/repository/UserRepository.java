package org.oopim.filmportal.repository;

import org.bson.types.ObjectId;
import org.oopim.filmportal.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {

    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);

}
