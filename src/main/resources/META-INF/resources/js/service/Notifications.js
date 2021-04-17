import confetti from '../../deps/canvas-confetti.js';
import notie from '../../deps/notie.js';

function buildConfetti() {
    confetti.create(document.getElementById('canvas'), {
        resize: true,
        useWorker: true,
    })({ particleCount: 200, spread: 200 });
}

function toast(msg, type) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: type,
        title: msg,
    })
}

function customAlert(text, type) {
    notie.alert({
        type: type, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: text,
        stay: 'false', // optional, default = false
        time: '2', // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    });
}

const delay = async() => {
    await sleep(5000);
    //code to be executed
}

export { toast, delay, buildConfetti, customAlert };