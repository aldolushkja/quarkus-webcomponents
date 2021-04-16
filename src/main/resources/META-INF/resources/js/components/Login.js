import { html, render } from '../../deps/lit-html.js';
import { toast } from '../service/Commons.js';
import { serverUrl } from '../service/Constants.js';

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
        <button class="btn btn-large" id="loginBtn" @click=${this.doLogin}>Login</button>
        </div>
    </div>
        `;

        render(content, this);
    }
    async doLogin() {
        const usernameEl = document.getElementById("username");
        const passwordEl = document.getElementById("password");
        const tokenEl = document.getElementById("csrf_token");
        console.log(usernameEl.value + " - " + passwordEl.value);

        var payload = {
            'csrf_token': tokenEl.innerText,
            'username': usernameEl.value,
            'password': passwordEl.value,
        };

        console.log('payload=' + JSON.stringify(payload, "", 4));
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload, "", 4)
        };

        const response = await fetch(serverUrl + "/login", settings);
        const json = await response.json();
        console.log(json)
        if (response.status !== 200) {
            toast('Login failed, please retry....', 'error');
            usernameEl.value = '';
            passwordEl.value = '';
            // window.location.assign(serverUrl);
            return;
        }
        console.log('JSON=' + json);
        toast('Login successful', 'info');
        window.location.assign(serverUrl + "/generator.html");
    };
}
customElements.define('login-wc', Login);