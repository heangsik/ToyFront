<script lang="ts">
</script>

<div class="nav_container">
	<h1>ToyProject</h1>
	<nav class="nav_bar">
		<ul class="">
			<li><a href="/">Home</a></li>
			<li><a href="/about">About</a></li>
		</ul>
	</nav>
</div>

<style lang="scss">
	.nav_container {
		@apply p-0  m-0;
		h1 {
			@apply text-2xl font-bold text-center text-white;
		}
		.nav_bar {
			@apply m-0 p-0;
			ul {
				@apply flex justify-center p-0 m-0 list-none;
				li {
					@apply pr-10;
				}
			}
		}
	}
</style>
