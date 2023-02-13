/**
 * demonstrates a simple graphql query and subscription from the client-side perspective.
 * 
 * @author Josh Long
 */
import {createClient} from 'graphql-ws';

window.addEventListener('load', function () {

    const client = createClient({
        url: 'ws://localhost:8080/graphql',
    });

    // queries
    client.subscribe(
        {
            query: 'query { hello( name: "World") { message } }',
        },
        {
            next: (data) => console.log('query result: ', data ['data']['hello']),
            error: (error) => console.error(error),
            complete: () => console.log('done with query!!!')
        },
    );

    // subscriptions
    client.subscribe(
        {
            query: 'subscription { files { path } }',
        },
        {
            next: (result) => {
                console.log('new file data!', result.data ['files']);
            },
            error: (error) => {
                console.log('oops! we got an error!');
            },
            complete: (done) => {
                console.log("we're done!");
            },
        },
    );

});

