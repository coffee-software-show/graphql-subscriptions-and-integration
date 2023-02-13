// https://formidable.com/open-source/urql/docs/basics/core/
import {createClient} from 'graphql-ws';

window.addEventListener('load', event => {



    const client = createClient({
        url: 'ws://localhost:8080/graphql',
    });

// query
    (async () => {
        const result = await new Promise((resolve, reject) => {
            let result;
            client.subscribe(
                {
                    query: 'query { hello( name: "World") { message } }',
                },
                {
                    next: (data) => (result = data),
                    error: reject,
                    complete: () => resolve(result),
                },
            );
        });

    })();

// subscription
    (async () => {
        const onNext = (result) => {
          console.log(   result.data ['files'])
        };

        let unsubscribe = () => {
            console.log('unsubscribe...');
        };

        await new Promise((resolve, reject) => {
            unsubscribe = client.subscribe(
                {
                    query: 'subscription { files { path } }',
                },
                {
                    next: onNext,
                    error: reject,
                    complete: resolve,
                },
            );
        });


    })();

})

