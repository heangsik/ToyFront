<script lang="ts">
	import { userAction } from '../store/store';
</script>

<div class="nav_container">
	<h1>ToyProject</h1>
	<nav class="nav_bar">
		<div class=" w-5/6">
			<ul class="">
				<li><a href="/">Home</a></li>
				<li><a href="/login">Login</a></li>
				<li><a href="/sudoku">sudoku</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</div>
		<div class="w-1/6 text-center">
			{$userAction.isLogin ? '로그인됨' : '로그아웃'}
		</div>
	</nav>
</div>

<style lang="scss">
	.nav_container {
		@apply p-0  m-0;
		h1 {
			@apply text-2xl font-bold text-center text-white;
		}
		.nav_bar {
			@apply m-0 p-0 flex justify-between;
			ul {
				@apply flex justify-center p-0 m-0 list-none;
				li {
					@apply pr-10;
				}
			}
		}
	}
</style>
