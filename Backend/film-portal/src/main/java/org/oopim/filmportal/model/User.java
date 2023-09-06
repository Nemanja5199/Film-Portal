package org.oopim.filmportal.model;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private ObjectId id;

    private String username;
    private String email;
    private String password;
    private String role;
    @DocumentReference
    private List<Film> films;
    @DocumentReference
    private List<Role> roles = new ArrayList<>();


    public User(String username, String email,String password){
        this.username=username;
        this.email=email;
        this.password=password;
        this.role= "regular";
    }


}
