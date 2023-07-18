package org.oopim.filmportal.service;

import org.bson.types.ObjectId;
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
        return filmRepository.findFilmByImdbId(imdbId);
    }
}
