<script lang="ts">
	let board = Array(9)
		.fill(0)
		.map(() => Array(9).fill(0));
</script>

<div class="container">
	<div>sudoku</div>
	<div class="board">
		{#each board as row, rowidx}
			{#each row as cell, cellidx}
				<input class="cell" type="text" bind:value={cell} />
			{/each}
		{/each}
	</div>
</div>

<style lang="scss">
	.board {
		@apply grid grid-cols-9 grid-rows-9  max-w-fit  max-h-fit gap-0 m-auto;
	}
	.cell {
		@apply w-10 h-10 text-center text-lg border border-gray-600 m-0 px-0;
	}
	.cell:nth-child(3n) {
		@apply border-r-4 border-r-black;
	}

	.cell:nth-child(1),
	.cell:nth-child(10),
	.cell:nth-child(19),
	.cell:nth-child(28),
	.cell:nth-child(37),
	.cell:nth-child(46),
	.cell:nth-child(55),
	.cell:nth-child(64),
	.cell:nth-child(73) {
		@apply border-l-4 border-l-black;
	}

	.cell:nth-child(n + 1):nth-child(-n + 9) {
		@apply border-t-4 border-t-black;
	}
	.cell:nth-child(n + 19):nth-child(-n + 27),
	.cell:nth-child(n + 46):nth-child(-n + 54),
	.cell:nth-child(n + 73):nth-child(-n + 81) {
		@apply border-b-4 border-b-black;
	}
</style>
