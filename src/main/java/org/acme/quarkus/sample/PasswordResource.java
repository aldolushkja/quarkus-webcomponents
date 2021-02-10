package org.acme.quarkus.sample;

import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.faulttolerance.Timeout;
import org.eclipse.microprofile.metrics.annotation.Counted;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;

@Path("/password")
public class PasswordResource {
    Logger logger = LoggerFactory.getLogger(PasswordResource.class);

    @Inject
    PasswordRepository passwordRepository;

    @Inject
    PasswordStore passwordStore;

    @Retry(maxRetries = 2)
    @Fallback(fallbackMethod = "timeoutFallback")
    @Timeout(20000)
//    @Timed
    @Counted
    @GET
    @Path("/health")
    public Response healthPWD() throws InterruptedException {
//        Thread.sleep(3000);
        return Response.ok("Health:Live con domenico").build();
    }

    @GET
    @Path("{pwd}")
    public Response findByPWD(@PathParam("pwd") String pwd) {
        try {
            return Response.ok(passwordRepository.findByPwd(pwd)).build();
        } catch (Exception e) {
            return Response.noContent().build();
        }
    }

    public Response timeoutFallback(){
        return Response.ok("Fallback method invoked").build();
    }

    @POST
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response save(String pwd) {
        try {
            final Password password = passwordStore.createPWD(pwd);
            passwordRepository.persistAndFlush(password);
            return Response.created(URI.create(password.toString())).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.noContent().build();
        }
    }

    @PUT
    @Path("{oldpwd}/{newpwd}")
    @Transactional
    public Response save(@PathParam("oldpwd") String oldpwd, @PathParam("newpwd") String newpwd) {
        try {
            passwordStore.updatePWD(oldpwd, newpwd);
            return Response.status(201).entity("Password updated").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.notModified().build();
        }
    }

}
