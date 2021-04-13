import {html, render} from "../deps/lit-html.js";

class TestComponent extends HTMLElement {
    connectedCallback() {
        var c = html`
            <h1>This is a test component
                <h1>
                    <button @click=${e => this.btnClick}>Click me</button>`
        render(c, this)
    }

    btnClick = () => {
        console.log("Hello from lit-html");
        alert("Hello from lit-html");
    }
}

customElements.define('test-el', TestComponent)