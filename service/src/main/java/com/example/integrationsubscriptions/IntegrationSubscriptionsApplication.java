package com.example.integrationsubscriptions;

import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.integration.channel.FluxMessageChannel;
import org.springframework.integration.core.GenericHandler;
import org.springframework.integration.core.GenericTransformer;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.MessageChannels;
import org.springframework.integration.file.dsl.Files;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import java.io.File;

@SpringBootApplication
public class IntegrationSubscriptionsApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntegrationSubscriptionsApplication.class, args);
    }

}

record Greeting(String message) {
}

// https://docs.spring.io/spring-integration/reference/html/reactive-streams.html#message-source-to-reactive-streams
@Configuration
class IntegrationConfiguration {

    @Bean
    FluxMessageChannel fileEventsFluxMessageChannel() {
        return MessageChannels.flux().get();
    }

    @Bean
    Publisher<Message<FileEvent>> flow(@Value("file://${HOME}/Desktop/in") File in) {
        var files = Files.inboundAdapter(in).autoCreateDirectory(true);//this could be kafka or rabbitmq or jms or anything
        System.out.println("the file is " + in.getAbsolutePath() + " and it exists? " + (in.exists()));
        return IntegrationFlow //
                .from(files, pc -> pc.poller(pm -> pm.fixedRate(1000))) //
                .transform((GenericTransformer<File, FileEvent>) source -> new FileEvent(source.getAbsolutePath()))
                .handle((GenericHandler<FileEvent>) (payload, headers) -> {
                    headers.forEach((key, value) -> System.out.println(key + '=' + headers.get(key)));
                    System.out.println("the payload type is " + (payload.getClass().getName()));
                    System.out.println(payload.path());
                    return payload;
                })
                .toReactivePublisher(true);
    }
}
@SuppressWarnings("unused")
@Controller
class GraphqlFilesController {


    private final Publisher<Message<FileEvent>> flow;

    GraphqlFilesController(Publisher<Message<FileEvent>> flow) {
        this.flow = flow;
    }

    @QueryMapping
    Greeting hello(@Argument String name) {
        return new Greeting("Hello, " + name + "!");
    }

    @SubscriptionMapping
    Flux<FileEvent> files() {
        System.out.println("going to get the files..");
        return Flux.from(flow).map(Message::getPayload);
    }
}

record FileEvent(String path) {
}