<script>
	import { run } from "svelte/legacy";

	import { onMount } from "svelte";
	import { useNavigate, useLocation, useFocus } from "svelte-navigator";
	import { user, asyncCheckAuthStatus } from "./stores";
	/** @type {{children?: import('svelte').Snippet<[any]>}} */
	let { children } = $props();

	let isChecking = $state(true);

	const navigate = useNavigate();
	const location = useLocation();
	const registerFocus = useFocus();

	const navigateToLogin = () => {
		navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
	};

	onMount(async () => {
		try {
			await asyncCheckAuthStatus();
		} catch {
			navigateToLogin();
		} finally {
			isChecking = false;
		}
	});

	run(() => {
		if (!$user && !isChecking) {
			navigateToLogin();
		}
	});
</script>

{#if $user && !isChecking}
	{@render children?.({ registerFocus })}
{/if}

{#if isChecking}
	<p>Checking auth status...</p>
{/if}
