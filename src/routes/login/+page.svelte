<script lang="ts">
    import 
	let formData = {
		email: '',
		password: ''
	};
	let error = '';
	let loading = false;

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		loading = true;
		error = '';

		try {
			const response = await fetch('http://localhost:9988/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			console.log(`response data: ${data}`);
			console.log(`response data: ${JSON.stringify(data)}`);

		} catch (err: any) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}
</script>

<div class="container">
	<form on:submit={handleSubmit}>
		<div class="form-group">
			<label for="username">Username:</label>
			<input type="text" id="username" name="username" required bind:value={formData.email} />
		</div>
		<div class="form-group">
			<label for="password">Password:</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				bind:value={formData.password}
			/>
		</div>
		<button type="submit" disabled={loading}>Login</button>
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</form>
</div>

<style lang="scss">
	.container {
		@apply bg-slate-200 mx-auto p-8 rounded-lg shadow-black shadow-lg;
		&:hover {
			@apply bg-slate-300;
		}
	}

	form {
		@apply flex flex-col;
	}

	.form-group {
		@apply flex items-center mb-4;
		label {
			@apply mb-2 font-bold w-32;
		}

		input {
			@apply flex-1 p-2 mb-4  border-b border-blue-700 border-solid text-base bg-transparent;
			&:focus {
				@apply outline-none border-blue-700;
			}
		}
	}

	button {
		@apply p-3 bg-blue-500 text-white border-none rounded-s text-base cursor-pointer transition duration-300 ease-in-out;
		&:hover {
			@apply bg-blue-700;
		}
	}
	.error {
		@apply text-red-700 mt-4;
	}
</style>
