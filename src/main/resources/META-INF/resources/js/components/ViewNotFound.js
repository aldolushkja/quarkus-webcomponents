import { html, render } from '../../deps/lit-html.js';

class ViewNotFound extends HTMLElement {
    connectedCallback() {
        var template = html `
            <h1>404</h1>
            <h2>View Not Found</h2>
        `;
        render(template, this);
    }
}

customElements.define('x-not-found-view', ViewNotFound);