package org.oopim.filmportal.repository;

import org.bson.types.ObjectId;
import org.oopim.filmportal.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Role, ObjectId> {

    Optional<Role> findByName(String name);

}
