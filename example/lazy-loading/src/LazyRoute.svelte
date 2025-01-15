<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script>
	import { Route } from "svelte-navigator";
	import Lazy from "./Lazy.svelte";

	const stuff = $props();
	const { component, delayMs = null, ...rest } = $derived(stuff);
	/* 	export let component;
	export let delayMs = null; */

	let properties = $state();
	$effect(() => {
		// eslint-disable-next-line no-shadow
		const { component, ...restProps } = stuff;
		properties = restProps;
	});
</script>

<Route {...properties}>
	<Lazy {component} {delayMs}>
		{@render stuff?.()}
	</Lazy>
</Route>
