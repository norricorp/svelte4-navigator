<script>
	import { Route } from "svelte-navigator";
	import PrivateRouteGuard from "./PrivateRouteGuard.svelte";

	/** @type {{path: any, children?: import('svelte').Snippet<[any]>}} */
	let { path, children } = $props();
</script>

<Route {path}>
	{#snippet children({ params, location, navigate })}
		<PrivateRouteGuard>
			{@render children?.({ params, location, navigate })}
		</PrivateRouteGuard>
	{/snippet}
</Route>
