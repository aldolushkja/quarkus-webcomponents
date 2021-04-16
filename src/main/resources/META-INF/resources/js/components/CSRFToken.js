class CSRFToken extends HTMLElement {
    constructor() {
        super();
        this.token = "";
    }

    async connectedCallback() {
        this.id = 'csrf_token';
        this.style.display = 'none';
        this.innerText = await this.fetchFromServer();
    }

    async fetchFromServer() {
        const response = await fetch("http://localhost:9001/csrf-token");
        if (response.status !== 200) {
            console.log("No token available, invalid form submit")
            return;
        }
        const json = await response.json();
        const { message, token } = json;
        console.log(message);
        return token;
    }
}

customElements.define("csrf-token", CSRFToken);