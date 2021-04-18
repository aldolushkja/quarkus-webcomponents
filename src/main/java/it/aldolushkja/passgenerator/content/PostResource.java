

package it.aldolushkja.passgenerator.content;

import java.io.PrintStream;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * PostResource
 */
@Path("/v1/posts")
public class PostResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveOrUpdate(JsonObject payload) {
        String title = payload.getString("title");
        String content = payload.getString("content");
        PrintStream printf = System.out.printf(
                "PostResource.saveOrUpdate() ----- title: %s --- content: %s", title, content);
        return Response.ok(payload.toString()).build();
    }


}
