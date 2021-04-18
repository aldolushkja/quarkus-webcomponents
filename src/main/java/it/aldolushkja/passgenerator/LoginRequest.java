package it.aldolushkja.passgenerator;

import javax.json.bind.annotation.JsonbProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @JsonbProperty(value = "csrf_token")
    private String csrfToken;

    @JsonbProperty(value = "username")
    private String username;

    @JsonbProperty(value = "password")
    private String password;
}
