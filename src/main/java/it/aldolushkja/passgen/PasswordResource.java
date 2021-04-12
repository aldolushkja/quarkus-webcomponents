package it.aldolushkja.passgen;

import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/password")
@Slf4j
public class PasswordResource {

  @Inject PasswordRepository passwordRepository;

  @Inject PasswordService passwordService;

  @GET
  @Path("{pwd}")
  public Response findByHash(@PathParam("pwd") String pwd) {
    try {
      return Response.ok(passwordRepository.findByPwd(pwd)).build();
    } catch (Exception e) {
      return Response.noContent().build();
    }
  }

  @POST
  @Consumes(MediaType.TEXT_PLAIN)
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response save(String pwd) {
    try {
      final PasswordEntity passwordEntity = passwordService.buildNewPwd(pwd);
      passwordRepository.persistAndFlush(passwordEntity);
      return Response.status(Response.Status.CREATED).entity(passwordEntity).build();
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
      passwordService.update(oldpwd, newpwd);
      return Response.status(201).entity("Password updated").build();
    } catch (Exception e) {
      e.printStackTrace();
      return Response.notModified().build();
    }
  }
}
