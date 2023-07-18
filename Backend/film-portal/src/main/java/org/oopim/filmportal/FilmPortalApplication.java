package org.oopim.filmportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class FilmPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilmPortalApplication.class, args);
	}

	@GetMapping(value = "/home")
	public String helloWorld() {
		return "Hello World";
	}

}
