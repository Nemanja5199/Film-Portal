package org.oopim.filmportal.controller;

import org.bson.types.ObjectId;
import org.oopim.filmportal.model.Film;
import org.oopim.filmportal.model.Review;
import org.oopim.filmportal.model.User;
import org.oopim.filmportal.service.FilmService;
import org.oopim.filmportal.service.ReviewService;
import org.oopim.filmportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @Autowired
    private FilmService filmService;

    @PostMapping
    public ResponseEntity<String> createReview(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(reviewService.createReview(payload.get("reviewBody"), payload.get("imdbId")), HttpStatus.CREATED);
    }

    @DeleteMapping("/{imdbId}/{id}")
    public ResponseEntity<String> deleteReviewFromFilm(@PathVariable String imdbId, @PathVariable ObjectId id, @RequestParam String username) {
        try {
            Optional<User> userOptional = userService.getUserByUsername(username);

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                // Check if the user has the "ADMIN" role
                boolean isAdmin = user.getRoles().stream()
                        .anyMatch(role -> "ADMIN".equals(role.getName()));

                if (isAdmin) {

                    Optional<Film> filmOptional = filmService.getFilmById(imdbId);

                    if (filmOptional.isPresent()) {
                        Film film = filmOptional.get();

                        // Find and remove the review by reviewId
                        List<Review> reviews = film.getReviews();
                        Optional<Review> reviewToRemove = reviews.stream()
                                .filter(review -> review.getId().equals(id))
                                .findFirst();

                        if (reviewToRemove.isPresent()) {
                            reviews.remove(reviewToRemove.get());
                            filmService.updateFilm(film);

                            return new ResponseEntity<>("Review removed from the film.", HttpStatus.OK);
                        } else {
                            return new ResponseEntity<>("Review not found in the film.", HttpStatus.NOT_FOUND);
                        }
                    } else {
                        return new ResponseEntity<>("Film not found.", HttpStatus.NOT_FOUND);
                    }
                } else {
                    return new ResponseEntity<>("You do not have permission to delete reviews.", HttpStatus.FORBIDDEN);
                }
            } else {
                return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {

            return new ResponseEntity<>("Error deleting review: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
