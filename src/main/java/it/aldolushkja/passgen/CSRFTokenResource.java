package it.aldolushkja.passgen;

import org.apache.commons.lang3.RandomStringUtils;

import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("csrf-token")
public class CSRFTokenResource {

  // JAXRS - Resteasy / Apache CXF
  // Serialize/Deserialize - JSONB / Jackson
  // JSON Processing - JSONP

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response buildOne() {
    String token = RandomStringUtils.randomAscii(128);
    JsonObject payload =
        Json.createObjectBuilder()
            .add("message", "CSRF Token initialized")
            .add("token", token)
            .build();

    return Response.status(Response.Status.OK).entity(payload).build();
  }
}
