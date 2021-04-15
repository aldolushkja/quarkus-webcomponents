import "./CSRFToken.js";
import "./Login.js";
import confetti from '../deps/canvas-confetti.js';


confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
})({ particleCount: 200, spread: 200 });