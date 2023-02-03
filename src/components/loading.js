const template = document.createElement('template');
template.innerHTML = `
  <div id="loading-box">
    <div class="loading-content">
      <ul class="loading-title-list">
        <li>오늘</li>
        <li>내일</li>
        <li>모레</li>
      </ul>
      <span>날씨어때?</span>
    </div>
  </div>
`;

class LoadingBox extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'closed' });
    //this.render();
    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);
    //     const style = document.createElement('style');
    //     style.textContent = `

    //     #loading-box {
    //   position: fixed;
    //   left: 0;
    //   top: 0;
    //   z-index: 200;
    //   width: 100%;
    //   height: 100%;
    //   background: var(--white-color);
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   font-family: 'NIXGONM-Vb', sans-serif;
    //   font-size: 80px;
    //   visibility: visible;
    //   opacity: 1;
    //   transition: opacity 0.3s, visibility 0.3s;
    //   border: 1px solid #f00;
    // }
    // #loading-box.on {
    //   visibility: visible;
    //   opacity: 1;
    // }
    // .loading-content {
    //   position: relative;
    //   padding-left: 160px;
    //   overflow: hidden;
    // }
    // .loading-title-list {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   display: inline-block;
    // }

    //     `;
    //     shadowRoot.appendChild(style);

    //shadowRoot.appendChild(style);
  }

  // connectedCallback() {
  //   this.render();
  // }

  // render() {
  //   this.shadowRoot.innerHTML += `
  //     <div id="loading-box">
  //       <div class="loading-content">
  //         <ul class="loading-title-list">
  //           <li>오늘</li>
  //           <li>내일</li>
  //           <li>모레</li>
  //         </ul>
  //         <span>날씨어때?</span>
  //       </div>
  //     </div>
  //   `;
  // }
}

customElements.define('loading-box', LoadingBox);
