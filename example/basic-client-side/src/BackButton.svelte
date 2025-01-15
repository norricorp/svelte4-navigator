<script>
	import { useNavigate } from "svelte-navigator";

	const navigate = useNavigate();
</script>

<button title="Go back" onclick={() => navigate(-1)}>&lt;-</button>
