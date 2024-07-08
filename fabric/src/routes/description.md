routes contains the routes of your application. You can also colocate other components that are only used within a single route here.
(https://kit.svelte.dev/docs/routing)

Any other files inside a route directory are ignored by SvelteKit. This means you can colocate components and utility modules with the routes that need them.

If components and modules are needed by multiple routes, it's a good idea to put them in $lib.