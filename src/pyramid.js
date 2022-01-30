export class Pyramid {
  constructor() {
    this.pyramidContainer = document.getElementById("pyramid");
    this.COUNT = 61;
    this.initArray = [];
  }

  setInit(count) {
    const arr = [];

    // Count must be odd
    for (let i = 0; i < count; i++) {
      arr.push(i === Math.floor(count / 2) ? 1 : 0);
    }

    this.initArray.push(arr);
  }

  applyPyramid(count, maxIteration = 30) {
    for (let j = 0; j < maxIteration; j++) {
      const arr = [];
      const lastLine = this.initArray[this.initArray.length - 1];

      for (let i = 0; i < count; i++) {
        const currentElOfLine = lastLine[i];
        const prevElOfLine = i === 0 ? null : lastLine[i - 1];
        const nextElOfLine = i === count - 1 ? null : lastLine[i + 1];

        arr.push(prevElOfLine ^ currentElOfLine ^ nextElOfLine ? 1 : 0);
      }

      this.initArray.push(arr);
    }
  }

  draw(drawData = [], container) {
    const subContainer = document.createElement("ul");
    subContainer.classList.add("sub-container");

    drawData.forEach((item) => {
      const el = document.createElement("li");
      el.classList.add("pyramid-item", item === 1 && "active");

      subContainer.appendChild(el);
    });

    container.appendChild(subContainer);
  }

  start() {
    this.setInit(this.COUNT);
    this.applyPyramid(this.COUNT);

    this.initArray.forEach((line, index) => {
      setTimeout(() => {
        this.draw(line, this.pyramidContainer);
      }, (index + 1) * 300);
    });
  }
}
