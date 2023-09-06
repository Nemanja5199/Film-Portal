package org.oopim.filmportal.controller;

import org.oopim.filmportal.dto.UserDTO;
import org.oopim.filmportal.model.Film;
import org.oopim.filmportal.model.Role;
import org.oopim.filmportal.model.User;
import org.oopim.filmportal.repository.UserRepository;
import org.oopim.filmportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {

        Optional<User> userOptional = userService.getUserByUsername(username);

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            String userUsername = user.getUsername();
            List<Film> films = user.getFilms();
            List<Role> roles = user.getRoles();

            UserDTO userDTO = new UserDTO(userUsername, films, roles);

            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }



}
