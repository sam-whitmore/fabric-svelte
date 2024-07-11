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
	<ul class="p-2">
		{#each query.data as response}
			<li class="text-right">
				<span>{response.qual}</span>
				<span>{(response.quant / 1000).toFixed(1)}</span>
			</li>
		{/each}
	</ul>
{/if}