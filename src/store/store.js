import { writable } from 'svelte/store';

// 초기 상태 정의
const initialState = {
	accessToken: '',
	refreshToken: '',
	isLogin: false,
	user: null
};

// export const authToken = writable(initialState);

const userActions = () => {
	const { subscribe, set } = writable(initialState);

	return {
		subscribe,
		login: async ({ email, password }) => {
			console.log('POST request received login');

			try {
				const response = await fetch('/api', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ action: 'LOGIN', email, password })
				});
				const responseJson = await response.json();
				console.log('responseJson', responseJson);
				const { accessToken, refreshToken, user } = responseJson;
				// this.set({ accessToken, refreshToken, isLogin: true, user });
				set({ accessToken, refreshToken, isLogin: true, user });

				return { success: true };
			} catch (error) {
				console.log('error ~~~~~~~~~~~~~~~~~~~~~~', error);
				set(initialState);
				return { success: false };
			}
		},
		logout: async () => {
			set(initialState);
			return { success: true };
		}
	};
};

export const userAction = userActions();
