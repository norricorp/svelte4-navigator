<script>
	import { useNavigate } from "svelte-navigator";

	const navigate = useNavigate();
</script>

<button title="Go forward" onclick={() => navigate(1)}>-&gt;</button>
