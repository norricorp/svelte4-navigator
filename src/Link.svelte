<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props
 in a way that cannot be automatically migrated. -->
<script>
	/*
	 * Adapted from https://github.com/EmilTholin/svelte-routing
	 *
	 * https://github.com/EmilTholin/svelte-routing/blob/master/LICENSE
	 */

	import { createEventDispatcher } from "svelte";
	import {
		useLocation,
		useResolve,
		useHistory,
		usePreflightCheck,
	} from "./hooks";
	import { shouldNavigate, isFunction } from "./utils";
	import { startsWith } from "./paths";
	import { LINK_ID } from "./warning";
	import { parsePath, stringifyPath } from "./routes";

	const stuff = $props();
	const {
		to,
		replace = false,
		state = {},
		getProps = null,
		...rest
	} = $derived(stuff);
	/* 	export let to;
	export let replace = false;
	export let state = {};
	export let getProps = null; */

	usePreflightCheck(LINK_ID, stuff);

	const location = useLocation();
	const dispatch = createEventDispatcher();
	const resolve = useResolve();
	const { navigate } = useHistory();

	let href = $state();
	let isPartiallyCurrent;
	let isCurrent;
	let isExactCurrent;
	let properties = $state();
	let ariaCurrent = $state();

	// We need to pass location here to force re-resolution of the link,
	// when the pathname changes. Otherwise we could end up with stale path params,
	// when for example an :id changes in the parent Routes path
	$effect(() => {
		href = resolve(to, $location);
	});
	$effect(() => {
		isPartiallyCurrent = startsWith($location.pathname, href);
	});
	$effect(() => {
		isCurrent = href === $location.pathname;
	});
	$effect(() => {
		isExactCurrent = parsePath(href) === stringifyPath($location);
	});
	$effect(() => {
		ariaCurrent = isCurrent ? { "aria-current": "page" } : {};
	});

	$effect(() => {
		properties = (() => {
			if (isFunction(getProps)) {
				const dynamicProps = getProps({
					location: $location,
					href,
					isPartiallyCurrent,
					isCurrent,
				});
				return { ...rest, ...dynamicProps };
			}
			return rest;
		})();
	});

	function onClick(event) {
		dispatch("click", event);

		if (shouldNavigate(event)) {
			event.preventDefault();
			// Don't push another entry to the history stack when the user
			// clicks on a Link to the page they are currently on.
			const shouldReplace = isExactCurrent || replace;
			navigate(href, { state, replace: shouldReplace });
		}
	}
</script>

<a {href} {...ariaCurrent} onclick={onClick} {...properties}>
	{@render stuff?.()}
</a>
