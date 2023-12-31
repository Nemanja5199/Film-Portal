package org.oopim.filmportal.service;

import org.oopim.filmportal.model.Film;
import org.oopim.filmportal.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmService {

    @Autowired
    private FilmRepository filmRepository;

    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    public Optional<Film> getFilmById(String imdbId) {
        return filmRepository.findByImdbId(imdbId);
    }

    public Film updateFilm(Film film) {
        try {
            // Save the updated film to the database
            return filmRepository.save(film);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to update film: " + ex.getMessage());
        }
    }
}
