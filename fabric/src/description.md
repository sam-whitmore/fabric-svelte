app.html is your page template — an HTML document containing the following placeholders:
- %sveltekit.head% — <link> and <script> elements needed by the app, plus any <svelte:head> content
- %sveltekit.body% — the markup for a rendered page. This should live inside a <div> or other element, rather than directly inside <body>, to prevent bugs caused by browser extensions injecting elements that are then destroyed by the hydration process. SvelteKit will warn you in development if this is not the case
- %sveltekit.assets% — either paths.assets, if specified, or a relative path to paths.base (https://kit.svelte.dev/docs/configuration#paths; https://kit.svelte.dev/docs/configuration#paths)
- %sveltekit.nonce% — a CSP nonce for manually included links and scripts, if used (https://kit.svelte.dev/docs/configuration#csp)
- %sveltekit.env.[NAME]% - this will be replaced at render time with the [NAME] environment variable, which must begin with the publicPrefix (usually PUBLIC_). It will fallback to '' if not matched. (https://kit.svelte.dev/docs/configuration#env)

error.html is the page that is rendered when everything else fails. It can contain the following placeholders:
- %sveltekit.status% — the HTTP status
- %sveltekit.error.message% — the error message

hooks.client.js contains your client hooks (https://kit.svelte.dev/docs/hooks)
hooks.server.js contains your server hooks (https://kit.svelte.dev/docs/hooks)
service-worker.js contains your service worker (https://kit.svelte.dev/docs/service-workers)

If you added Vitest when you set up your project, your unit tests will live in the src directory with a .test.js extension. (https://vitest.dev/)

## Fetch APIs
SvelteKit uses fetch for getting data from the network. It's available in hooks and server routes as well as in the browser.

A special version of fetch is available in load functions, server hooks and API routes for invoking endpoints directly during server-side rendering, without making an HTTP call, while preserving credentials. (To make credentialled fetches in server-side code outside load, you must explicitly pass cookie and/or authorization headers.) It also allows you to make relative requests, whereas server-side fetch normally requires a fully qualified URL.

Besides fetch itself, the Fetch API includes the following interfaces: (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Requestpermalink
An instance of Request is accessible in hooks and server routes as event.request. It contains useful methods like request.json() and request.formData() for getting data that was posted to an endpoint.

### Responsepermalink
An instance of Response is returned from await fetch(...) and handlers in +server.js files. Fundamentally, a SvelteKit app is a machine for turning a Request into a Response.

### Headerspermalink
The Headers interface allows you to read incoming request.headers and set outgoing response.headers. For example, you can get the request.headers and use the json convenience function to send modified response.headers.