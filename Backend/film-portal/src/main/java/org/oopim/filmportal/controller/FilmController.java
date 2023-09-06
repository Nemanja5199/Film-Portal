package org.oopim.filmportal.controller;

import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.oopim.filmportal.dto.FilmDTO;
import org.oopim.filmportal.model.Film;
import org.oopim.filmportal.model.User;
import org.oopim.filmportal.service.FilmService;
import org.oopim.filmportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/films")
public class FilmController {

    @Autowired
    private FilmService filmService;
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Film>> getAllFilms() {
        return new ResponseEntity<List<Film>>(filmService.getAllFilms(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Film>> getFilmById(@PathVariable String imdbId) {
        return new ResponseEntity<Optional<Film>>(filmService.getFilmById(imdbId), HttpStatus.OK);
    }

    @PutMapping("/updateUserListOfFilms")
    public ResponseEntity<User> updateUserListOfFilms(@RequestParam String username, @RequestParam String imdbId) {
        try {
            Optional<User> userOptional = userService.getUserByUsername(username);

            if(userOptional.isPresent()) {
                User user = userOptional.get();
                List<Film> userFilms = user.getFilms();

                Optional<Film> film = filmService.getFilmById(imdbId);

                boolean filmAlreadyExists = userFilms.stream()
                        .anyMatch(existingFilm -> existingFilm.getImdbId().equals(imdbId));

                if(!filmAlreadyExists) {
                    userFilms.add(film.get());
                    user = userService.updateUser(user);
                }

                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
