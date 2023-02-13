import {gql} from '@urql/core';

import {createClient} from '@urql/core';

window.addEventListener('load', event => {

    const client = createClient({
        url: 'http://localhost:8080/graphql',
    });

    const q = `
      query HelloWorld ($name: String) {
        hello(name: $name) {
          message
        }
      }
    `;

    client
        .query(q, { name: 'World'})
        .toPromise()
        .then(result => {
            console.log(result);
        });

})

