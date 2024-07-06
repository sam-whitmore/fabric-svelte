/* 
If your load function can only run on the server — 
for example, if it needs to fetch data from a database or you need to access private environment variables like API keys — 
then you can rename +page.js to +page.server.js and change the PageLoad type to PageServerLoad.

--- EXAMPLE FROM DOCS BELOW ---

import { error } from '@sveltejs/kit'

  @type {import('./$types').PageServerLoad} 
export async function load({ params }) {
  const post = await getPostFromDatabase(params.slug);

	if (post) {	
    return post;
  }
	
  error(404, 'Not found');
}

--- ---

During client-side navigation, SvelteKit will load this data from the server, which means that the returned value must be serializable using devalue.

Like +page.js, +page.server.js can export page options — prerender, ssr and csr.

A +page.server.js file can also export actions. If load lets you read data from the server, actions let you write data to the server using the <form> element.

*/
