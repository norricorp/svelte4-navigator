<script>
	import { Router, Route, Link } from "svelte-navigator";
	import Login from "./Login.svelte";
	import PrivateRoute from "./PrivateRoute.svelte";
	import { user } from "./stores";

	function handleLogout() {
		$user = null;
	}
</script>

<Router>
	<header>
		<h1>History</h1>

		<nav>
			<Link to="/">Home</Link>
			<Link to="about">About</Link>
			<Link to="profile">Profile</Link>
		</nav>
	</header>

	<main>
		<Route path="login">
			<Login />
		</Route>

		<Route path="/">
			<h3>Home</h3>
			<p>Home sweet home...</p>
		</Route>

		<Route path="about">
			<h3>About</h3>
			<p>That's what it's all about!</p>
		</Route>

		<PrivateRoute path="profile" let:registerFocus>
			<h3 use:registerFocus>Welcome {$user.username}</h3>
			<button on:click={handleLogout}>Logout</button>
		</PrivateRoute>
	</main>
</Router>

<style>
	:global(body) {
		font-family: sans-serif;
	}
</style>
