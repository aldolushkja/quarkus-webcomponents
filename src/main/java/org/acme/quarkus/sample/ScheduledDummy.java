package org.acme.quarkus.sample;

import io.quarkus.scheduler.Scheduled;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.time.temporal.ChronoUnit;

@ApplicationScoped
public class ScheduledDummy {

    @Inject
    @RestClient
    PasswordGenRestClient restClient;

    @Scheduled(every = "10s")
    public void callService(){
        System.out.println("Hello from Scheduled");
        Response response = restClient.health();
        if(response.getStatus() == 200){
            System.out.println("Hello from client");
        } else {
            System.out.println("NO Hello from client");
        }
    }
}
