import { html, render } from '../deps/lit-html.js';

class Login extends HTMLElement {

    connectedCallback() {
        var content = html `
	<div class="container">
        <csrf-token></csrf-token>
        <h2>Login</h2>
        <div class="login-container">
            <label for="username">Username</label> 
                <input type="text" id="username"></input>
            <label for="password">Password</label> 
            <input type="password" id="password"></input>
        <button class="btn btn-large" id="loginBtn" @click=${this.clickHandler}>Login</button>
        </div>
    </div>
        `;

        render(content, this);
    }
    console.log('boooh')
    console.log('booo111h')
    doLogin = {
        const usernameEl = document.getElementById("username");
        const passwordEl = document.getElementById("password");
        // var tokenEl = document.getElementById('csrf_token');
        console.log(usernameEl.value + " - " + passwordEl.value);

        var payload = {
            'csrf_token': tokenEl.value,
            'username': usernameEl.value,
            'password': passwordEl.value,
        };


        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: payload
        };

        const response = await fetch("http://localhost:9001/login", settings);

        // if (response.status !== 200) {
        //     toast('Login failed, please retry....', 'error');
        //     return;
        // }
        // const json = await response.json;
        // console.log('JSON=' + json);

        // toast('Login successful', 'info');


    };
}



customElements.define('login-wc', Login);

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