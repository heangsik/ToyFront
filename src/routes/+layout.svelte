<script lang="ts">
	import Header from './Header.svelte';

	let { children } = $props();
</script>

<div class="app">
	<header>
		<Header />
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
		</p>
	</footer>
</div>

<style>
	@import '../app.scss';
	header {
		@apply fixed top-0 w-full bg-gray-400;
	}
	main {
		@apply fixed top-16 w-full h-full;
	}
</style>
