

package it.aldolushkja.passgenerator.content;

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

        
        System.out.printf("PostResource.saveOrUpdate() ----- title: %s --- content: %s",
                payload.getString("title"), payload.getString("content"));
        return Response.ok(payload.toString()).build();
    }


}
