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

  draw(drawData = [], lineNumber) {
    const subContainer = document.createElement("ul");
    subContainer.classList.add("sub-container");

    drawData.forEach((item, index) => {
      const el = document.createElement("li");
      el.classList.add("field-item");
      el.classList.toggle("active", item === 1);
      el.setAttribute("data-x", index);
      el.setAttribute("data-y", lineNumber);

      subContainer.appendChild(el);
    });

    this.container.appendChild(subContainer);
  }
}
