<script>
	import { run } from "svelte/legacy";

	import { useMatch } from "../../../src";

	const relMatch = useMatch(":to/*somewhere");
	const absMatch = useMatch("/blog/match/:to/*somewhere");

	run(() => {
		window.useMatch = {
			relMatch: $relMatch,
			absMatch: $absMatch,
		};
	});
</script>
