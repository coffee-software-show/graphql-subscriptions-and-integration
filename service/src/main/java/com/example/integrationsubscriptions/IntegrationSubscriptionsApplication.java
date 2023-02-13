package com.example.integrationsubscriptions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import reactor.core.publisher.Flux;

import java.time.Duration;

@SpringBootApplication
public class IntegrationSubscriptionsApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntegrationSubscriptionsApplication.class, args);
    }

}

record Greeting(String message) {
}

@Controller
class GraphqlFilesController {

    @QueryMapping
    Greeting hello(@Argument String name) {
        return new Greeting("Hello, " + name + "!");
    }

    @SubscriptionMapping
    Flux<FileEvent> files() {
        System.out.println("going to get the files..");
        return Flux.just("/a/a.txt", "/b/b.txt", "/c/c.md") //
                .delayElements(Duration.ofSeconds(5)) //
                .map(FileEvent::new);
    }
}

record FileEvent(String path) {
}