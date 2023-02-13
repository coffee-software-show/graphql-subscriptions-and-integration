package com.example.integrationsubscriptions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import java.time.Duration;

@SpringBootApplication
public class IntegrationSubscriptionsApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntegrationSubscriptionsApplication.class, args);
    }

}


@Controller
class GraphqlFilesController {

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