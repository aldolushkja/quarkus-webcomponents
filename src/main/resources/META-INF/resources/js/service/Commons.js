import confetti from '../../deps/canvas-confetti.js';

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

const delay = async() => {
    await sleep(5000);
    //code to be executed
}

export { toast, delay, buildConfetti }