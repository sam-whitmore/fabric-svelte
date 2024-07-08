<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api.js';

	const query = useQuery(api.responses.get, {});
</script>

{#if query.isLoading}
	Loading...
{:else if query.error}
	failed to load: {query.error.toString()}
{:else}
	<ul>
		{#each query.data as response}
			<li>
				<span>{response.qual}</span>
				<span>{response.quant}</span>
			</li>
		{/each}
	</ul>
{/if}