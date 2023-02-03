class TestComponent extends HTMLElement {
  constructor() {
    super();

    const style = document.createElement('style');
    const span = document.createElement('span');
    span.textContent = '안녕?';

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(span);

    style.textContent = `
        span:hover { text-decoration: underline; }
        :host-context(h1) { font-style: italic; }
        :host-context(h1):after { content: " - no links in headers!" }
        :host-context(article, aside) { color: gray; }
        :host(.footer) { color : red; }
        :host { background: rgba(0,0,0,0.1); padding: 2px 5px; }
      `;
  }
}

customElements.define('context-span', TestComponent);
