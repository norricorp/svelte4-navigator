<script>
	import { useNavigate } from "../../../src";

	/** @type {{to: any, replace?: boolean}} */
	let { to, replace = false } = $props();

	const navigate = useNavigate();

	navigate(to, { replace });
</script>
