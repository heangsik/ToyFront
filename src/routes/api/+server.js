import { json } from '@sveltejs/kit';

// API 엔드포인트 상수
const API_URL = 'http://localhost:9988';

export const POST = async ({ request }) => {
	console.log('POST request received');
	const bodyJson = await request.json();
	console.log('bodyJson', bodyJson);
	const { action, email, password } = bodyJson;

	if (action == 'LOGIN') {
		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});
			console.log('response :', response);
			if (!response.ok) {
				throw new Error('Login failed');
			}
			const responseJson = await response.json();
			console.log('responseJson:', responseJson);
			const { accessToken, refreshToken, user } = responseJson;
			return json({ accessToken, refreshToken, user }, { success: true });
		} catch (error) {
			console.log('error :', error);
			return json({ success: false }, { error: error.message }, { status: 500 });
		}
	}
};
