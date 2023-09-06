package org.oopim.filmportal.service;

import org.oopim.filmportal.model.User;
import org.oopim.filmportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateUser(User updateUser) {
        try {
            User existingUser = userRepository.findByUsername(updateUser.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            existingUser.setFilms(updateUser.getFilms());

            return userRepository.save(existingUser);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to update user: " + ex.getMessage());
        }
    }
}
