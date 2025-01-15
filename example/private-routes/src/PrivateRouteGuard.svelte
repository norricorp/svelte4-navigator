<script>
	import { run } from "svelte/legacy";

	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "./stores";
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

	const navigate = useNavigate();
	const location = useLocation();

	run(() => {
		if (!$user) {
			navigate("/login", {
				state: { from: $location.pathname },
				replace: true,
			});
		}
	});
</script>

{#if $user}
	{@render children?.()}
{/if}
