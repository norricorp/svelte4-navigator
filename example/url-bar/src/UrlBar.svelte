<script>
	import { run } from "svelte/legacy";

	import { useLocation, useNavigate } from "svelte-navigator";

	const location = useLocation();
	const navigate = useNavigate();

	let url = $state();

	run(() => {
		url = $location.pathname;
	});

	function handleSubmit(e) {
		e.preventDefault();
		navigate(url);
	}

	function handleInput(e) {
		url = e.target.value;
	}
</script>

<div>
	<button type="submit" onclick={() => navigate(-1)}>&lt;-</button>
	<button type="submit" onclick={() => navigate(1)}>-&gt;</button>
	<form onsubmit={handleSubmit}>
		<input type="text" value={url} oninput={handleInput} />
		<button type="submit">GO</button>
	</form>
</div>

<style>
	form {
		display: inline-block;
	}
</style>
