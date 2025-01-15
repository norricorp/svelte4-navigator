<script>
	import { fly } from "svelte/transition";

	/** @type {{x?: number, duration?: number, direction?: "forward"|"backward", children?: import('svelte').Snippet}} */
	let { x = 200, duration = 500, direction = "forward", children } = $props();

	let directionFactor = $derived(direction === "forward" ? 1 : -1);
</script>

<div
	class="route-wrapper"
	in:fly|global={{ x: x * directionFactor, duration }}
	out:fly|global={{ x: -x * directionFactor, duration }}
>
	{@render children?.()}
</div>

<style>
	.route-wrapper {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
