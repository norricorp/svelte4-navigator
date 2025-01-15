import App from "./App.svelte";
import { hydrate } from "svelte";

export default hydrate(App, {
	target: document.getElementById("app"),
});
