import { html, render } from '../../deps/lit-html.js';
import { toast, customAlert } from '../service/Notifications.js';
import { serverUrl } from '../service/Constants.js';
import { sendData, generatePassword } from '../service/PasswordService.js';


class Generator extends HTMLElement {
    connectedCallback() {
        const template = html `
        <form>
            <textarea name="editor1" id="editor1" rows="10" cols="80">
                This is my textarea to be replaced with CKEditor 4.
            </textarea>
            <script>
                // Replace the <textarea id="editor1"> with a CKEditor 4
                // instance, using default configuration.
                CKEDITOR.replace('editor1');
            </script>
        </form>
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

customElements.define('texteditor-wc', Generator)