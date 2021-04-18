package it.aldolushkja.passgenerator.content;

import javax.json.bind.annotation.JsonbProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostPayload {
    @JsonbProperty(value = "title")
    private String title;
    @JsonbProperty(value = "content")
    private String content;
    @JsonbProperty(value = "token")
    private String token;
}
