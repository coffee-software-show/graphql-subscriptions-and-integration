// https://formidable.com/open-source/urql/docs/basics/core/
import {createClient} from 'graphql-ws';

function load() {

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
                console.log( 'new file data!',result.data ['files']);
            },
            error: (error) => {
                console.log('oops! we got an error!');
            },
            complete: (done) => {
                console.log("we're done!");
            },
        },
    );

}

window.addEventListener('load', load);


/*

// query
    (async () => {
        const result = await new Promise((resolve, reject) => {
            let result;

        });

    })();
*/




