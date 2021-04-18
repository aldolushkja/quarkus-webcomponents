import { html, render } from '../../deps/lit-html.js';
import { toast, customAlert } from '../service/Notifications.js';
import { serverUrl } from '../service/Constants.js';


class TextEditor extends HTMLElement {


    constructor() {
        super();
    }
    connectedCallback() {
        const template = html `
        <csrf-token></csrf-token>
        <div id="loading" class="hide"></div>
        <div id="form" class="flex-container custom-font">
            <h1>Crea un nuovo post</h1>

            <textarea name="editor1" id="editor1" rows="10" cols="80">
                This is my textarea to be replaced with CKEditor 4.
            </textarea>
            <div style="display:flex; flex-direction:column; align-items: center; justify-content: center;" id="id">
                <h2>Anteprima</h2>
                <div id="content" style ="border: 1px solid lightblue;"></div>
                <button id="save" class="save-btn" @click=${this.saveContent}>Save content</button>
            </div>
        </div>
    
        `;

        render(template, this);

        var editor = CKEDITOR.replace('editor1');


        editor.on('change', function(evt) {
            // showLoader();
            // console.log('Total bytes: ' + evt.editor.getData().length);
            // console.log('Content: ' + evt.editor.getData());
            document.getElementById('content').innerHTML = evt.editor.getData();
            // hideLoader();
        });
    }


    // The "click" event is fired whenever a save button is clicked.
    async saveContent() {

        var payload = {
            "token": "",
            "title": "",
            "content": "",
        };

        var content = CKEDITOR.instances.editor1.getData();
        console.log('>>>> Save : ' + content);

        payload.title = "Sample title";
        payload.content = content;
        payload.token = document.getElementById('csrf_token').innerText;

        console.log(payload);
        const response = await fetch(serverUrl + "/v1/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload, "", 4),
        });


        if (response.status !== 200) {
            toast("Salvataggio fallito", "error");
            return;
        }
        const json = await response.json();
        console.log("response=" + json);
        toast("Salvataggio completato", "success");

    };

    // showLoader() {
    //     document.getElementById('loading').classList.add('hide');
    // };
    // hideLoader() {
    //     document.getElementById('loading').classList.remove('hide');
    // };
}

customElements.define('texteditor-wc', TextEditor)