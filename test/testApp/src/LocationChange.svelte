<script>
	import { run } from "svelte/legacy";

	import { getContext } from "svelte";
	import { LOCATION, ROUTER } from "../../../src/contexts";

	/** @type {{onChange?: any}} */
	let { onChange = () => {} } = $props();

	const location = getContext(LOCATION);
	const { activeRoute, base, registerRoute, unregisterRoute, history } =
		getContext(ROUTER);

	run(() => {
		onChange({
			location: $location,
			activeRoute: $activeRoute,
			base,
			registerRoute,
			unregisterRoute,
			history,
		});
	});
</script>
