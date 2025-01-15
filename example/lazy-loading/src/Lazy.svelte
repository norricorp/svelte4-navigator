<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script>
	import { onMount } from "svelte";

	const stuff = $props();
	const { component, delayMs = null, ...rest } = $derived(stuff);
	/* 	export let component;
	export let delayMs = null; */

	let loadedComponent = $state(null);
	let timeout;
	let showFallback = $state();

	$effect(() => {
		showFallback = !delayMs;
	});

	let properties = $state();
	$effect(() => {
		// eslint-disable-next-line no-shadow
		const { component, delayMs, ...rest } = stuff;
		properties = rest;
	});

	onMount(() => {
		if (delayMs) {
			timeout = setTimeout(() => {
				showFallback = true;
			}, delayMs);
		}
		component().then(module => {
			loadedComponent = module.default;
		});
		return () => clearTimeout(timeout);
	});
</script>

{#if loadedComponent}
	<svelte:component this={loadedComponent} {...properties} />
{:else if showFallback}
	<slot />
{/if}
