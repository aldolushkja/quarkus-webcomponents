package org.acme.quarkus.sample;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/password")
@RegisterRestClient(configKey = "content")
public interface PasswordGenRestClient {

    @Path("/health")
    @GET
    public Response health();
}
