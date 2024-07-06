/* 
SvelteKit will 'walk up the tree' looking for the closest error boundary — 
if the file above didn't exist it would try src/routes/blog/+error.svelte and then src/routes/+error.svelte before rendering the default error page. 

If that fails (or if the error was thrown from the load function of the root +layout, which sits 'above' the root +error), 
SvelteKit will bail out and render a static fallback error page, which you can customise by creating a src/error.html file.

If the error occurs inside a load function in +layout(.server).js, the closest error boundary in the tree is an +error.svelte file above that layout (not next to it).

If no route can be found (404), src/routes/+error.svelte (or the default error page, if that file does not exist) will be used.

NOTE: +error.svelte is not used when an error occurs inside handle or a +server.js request handler.
*/