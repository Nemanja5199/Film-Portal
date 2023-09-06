package org.oopim.filmportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.oopim.filmportal.model.Film;
import org.oopim.filmportal.model.Role;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String username;
    private List<Film> films;
    private List<Role> roles;
}
