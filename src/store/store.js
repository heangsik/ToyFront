import { writable } from 'svelte/store';

export const authToken = writable({
	accessToken: '',
	refreshToken: '',
	isLogin: false,
	userName:'',
});

const userStore = () => {
	const { subscribe } = writable([]);

	return {
		subscribe,
		login: async ({ email, password }) => {
			console.log('POST request received login');
			
			try {
					// 			const response = await fetch('/api', {
					// method: 'POST',
					// headers: {
					// 	'Content-Type': 'application/json'
					// },
					// body: JSON.stringify({ action: 'ADD_DIARYS', contents: contents })
				// 			});
				// const response = await fetch('/api');
				
				const response = await fetch('/api', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ action: 'LOGIN', email, password }),
				});
				const responseJson = await response.json();
				console.log('responseJson', responseJson);
				


				return { success: true };
				
			} catch (error) {
				console.log('error', error);
				return { success: false };
				
			}
		},
	}
}

export const userAction = userStore();