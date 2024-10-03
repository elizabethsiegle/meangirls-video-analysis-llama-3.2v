This app analyzes your webcam video using the new multimodal LLaMA-3.2 Vision hosted on [Cloudflare Workers AI](https://developers.cloudflare.com/workers/ai/) in a Cloudflare Worker web app by capturing frames and providing compliments about the frame every 30 seconds in the style of Karen Smith! You can see more [models hosted on Cloudflare here](https://developers.cloudflare.com/ai/models/). (Beta models are free to run inference on on Cloudflare!)

[Test it out yourself in the browser here.](https://meangirlsoct3.lizziepika.workers.dev/)

To run the code--clone the repo and run the following:
```
npm install
npm run dev
```
To deploy:
```
npm run deploy
```