// Need only for extend
export class Base {
  constructor() {
    this.container = null;
  }

  createContainer(tag = "div", ...attributes) {
    const container = document.createElement(tag);

    attributes.forEach((attr) => {
      const [attrName, attrValue] = attr.split("=");

      container.setAttribute(attrName, attrValue);
    });

    document.querySelector("body").prepend(container);

    this.container = container;
  }

  draw(drawData = []) {
    const subContainer = document.createElement("ul");
    subContainer.classList.add("sub-container");

    drawData.forEach((item) => {
      const el = document.createElement("li");
      el.classList.add("field-item", item === 1 ? "active" : "non-active");

      subContainer.appendChild(el);
    });

    this.container.appendChild(subContainer);
  }
}
