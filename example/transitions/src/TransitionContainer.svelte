<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		position: relative;
	}
</style>
