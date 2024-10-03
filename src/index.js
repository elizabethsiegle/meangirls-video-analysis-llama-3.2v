import html from '../static/index.html';

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		if (request.method === 'GET' && url.pathname === '/') {
            return new Response(html, {
                headers: { 'Content-Type': 'text/html' },
            });
		}
		else if (request.method === 'POST' && url.pathname === '/analyze-video') {
			console.log('Received POST request to /analyze-video');
			
			const contentType = request.headers.get('Content-Type');
			console.log(`Content-Type: ${contentType}`);
			
			let formData = await request.formData();
			console.log(`formData keys: ${[...formData.keys()]}`);
			console.log(`formData values: ${[...formData.values()]}`);
			
			let frame = formData.get('frame');
			console.log(`frame type: ${frame ? frame.type : 'null'}`);
			console.log(`frame size: ${frame ? frame.size : 'null'}`);

			if (!frame) {
				return new Response('No frame received', { status: 400 });
			}

			// Convert the frame to a Uint8Array
			let arrayBuffer = await frame.arrayBuffer();
			let uint8Array = new Uint8Array(arrayBuffer);

			let input = {
				image: [...uint8Array],
				prompt: "You are Regina George from Mean Girls. Compliment the person in the image as if you are her.",
				max_tokens: 250,
			};

			try {
				let response = await env.AI.run(
					"@cf/meta/llama-3.2-11b-vision-instruct",
					input
				);
				console.log(`response: ${JSON.stringify(response["response"])}`);

				return new Response(JSON.stringify(response["response"]), {
					headers: { 'Content-Type': 'application/json' }
				});
			} catch (error) {
				console.log(`error: ${error}`);
				return new Response('Error analyzing frame: ' + error.message, { status: 500 });
			}
		}
	},
};
