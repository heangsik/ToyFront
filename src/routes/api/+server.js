

export const POST = async ({ request }) => {
    console.log('POST request received')
    const bodyJson = await request.json();
    console.log('bodyJson', bodyJson);
    const { email, password } = bodyJson;

    // if (action == 'LOGIN') {
    //     const { data, error } = await ;
        
    // 	try {
    // 		const response = await fetch('http://localhost:9988/auth/login', {
    // 			method: 'POST',
    // 			headers: {
    // 				'Content-Type': 'application/json'
    // 			},
    // 			body: JSON.stringify(formData),
    // 		});
    // 		if (!response.ok) {
    // 			throw new Error('Login failed');
    // 		}

    // 		const data = await response.json();
    // 		console.log(`response data: ${data}`);
    // 		console.log(`response data: ${JSON.stringify(data)}`);
    // 	} catch (err: any) {
    // 		error = err instanceof Error ? err.message : 'An error occurred';
    // 	} finally {
    // 		loading = false;
    // 	}
    // }
    return {success: true};
};