import { html, render } from '../../deps/lit-html.js';
import { toast } from '../service/Commons.js';
import { serverUrl } from '../service/Constants.js';
import { sendData, generatePassword } from '../service/PasswordService.js';


// DOM elements
const resultEl = document.getElementById('result')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')
const saveEl = document.getElementById('save')

class Generator extends HTMLElement {
    connectedCallback() {
        const template = html `
        <div class="container">

        <csrf-token></csrf-token>
        <h2>Password Generator</h2>
        <div class="result-container">
            <span id="result"></span>
            <button class="btn" id="clipboard" @click=${this.handleClipboardBtnClick}>
            <i class="far fa-clipboard"></i>
        </button>
        </div>
        <div class="settings">
            <div class="setting">
                <label for="length">Password length</label>
                <input type="number" id="length" min="4" max="20" value="20" />
            </div>
            <div class="setting">
                <label for="uppercase">Include uppercase letters</label>
                <input type="checkbox" id="uppercase" checked/>
            </div>
            <div class="setting">
                <label for="lowercase">Include lowercase letters</label>
                <input type="checkbox" id="lowercase" checked/>
            </div>
            <div class="setting">
                <label for="numbers">Include numbers</label>
                <input type="checkbox" id="numbers" checked/>
            </div>
            <div class="setting">
                <label for="symbols">Include symbols</label>
                <input type="checkbox" id="symbols" checked/>
            </div>
        </div>
        <div class="setting"></div>
        <button class="btn btn-large" @click=${this.handleGenerateBtnClick} id="generate">
        Generate password
    </button>
        <div class="setting"></div>
        <button class="btn btn-large" id="save" @click=${this.handleSaveBtnClick}>
        Save
    </button>
    </div>
        `;

        render(template, this);
    }




    handleGenerateBtnClick() {
        const length = +document.getElementById('length').value
        const hasLower = document.getElementById('lowercase').checked;
        const hasUpper = document.getElementById('uppercase').checked;
        const hasNumber = document.getElementById('numbers').checked;
        const hasSymbol = document.getElementById('symbols').checked;
        document.getElementById('result').innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    }

    handleClipboardBtnClick() {
        const textarea = document.createElement('textarea');
        const password = document.getElementById('result').innerText;
        if (!password) {
            return;
        }
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        alert('Password copied to clipboard');
    }

    handleSaveBtnClick() {
        const resultEl = document.getElementById('result');
        const password = resultEl.innerText;
        if (!password) {
            toast('Inserire una password prima di salvare', 'warning')
            return;
        }
        sendData(password);
        resultEl.innerText = '';
    }


}

customElements.define('password-generator', Generator)