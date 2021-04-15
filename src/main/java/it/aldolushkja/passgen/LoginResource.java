package it.aldolushkja.passgen;

import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginResource {


    @POST
    public Response doLogin(JsonObject payload) {
        String token = payload.getString("csrf_token");
        String username = payload.getString("username");
        String password = payload.getString("password");
        System.out.println("LoginResource.doLogin()---- token=" + token);
        if (token == null || token.trim().length() == 0 || username == null
                || username.trim().length() == 0 || password == null
                || password.trim().length() == 0) {
            return Response
                    .status(400).entity(Json.createObjectBuilder()
                            .add("message", "Richiesta non valida").add("status", "KO").build())
                    .build();
        }


        return Response.status(200).entity(
                Json.createObjectBuilder().add("message", "Login effettato").add("status", "OK"))
                .build();
    }

}
