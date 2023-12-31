package org.oopim.filmportal.repository;

import org.bson.types.ObjectId;
import org.oopim.filmportal.model.Film;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilmRepository extends MongoRepository<Film, ObjectId> {

    Optional<Film> findByImdbId(String imdbId);
}
