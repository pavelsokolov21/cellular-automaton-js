import { Base } from "./Base";

export class Pyramid extends Base {
  constructor() {
    super();
    this.iterations = 100;
    this.count = this.iterations * 2 + 1;
    this.probabilitySetPoint = 5;
    this.initArray = [];
    this.probabilitiesArray = Array(this.count).fill(0, 0, this.count);
    this.positiveProbability = 0.7;
  }

  setInit(count) {
    const arr = [];

    // Count must be odd
    for (let i = 0; i < count; i++) {
      arr.push(i === Math.floor(count / 2) ? 1 : 0);
    }

    this.initArray.push(arr);
  }

  setProbability() {
    const lastLine = this.initArray[this.initArray.length - 1];

    lastLine.forEach((element, index) => {
      if (element === 1) {
        this.probabilitiesArray[index]++;
      }
    });
  }

  calculateEntropy() {
    // Мб количество запусков автомата
    const countOfSetPoints = Math.floor(
      this.iterations / this.probabilitySetPoint
    );
    const entropy = this.probabilitiesArray
      .map((el) => el / countOfSetPoints)
      .reduce((acc, el) => {
        if (el) {
          return acc + el * Math.log2(el);
        }

        return acc;
      }, 0);

    console.log(entropy);
  }

  applyPyramid(count) {
    for (let j = 1; j <= this.iterations; j++) {
      const arr = [];
      const lastLine = this.initArray[this.initArray.length - 1];

      for (let i = 0; i < count; i++) {
        const probability = Math.random();
        const currentElOfLine = lastLine[i];
        const prevElOfLine = i === 0 ? null : lastLine[i - 1];
        const nextElOfLine = i === count - 1 ? null : lastLine[i + 1];
        const isAlive = prevElOfLine || currentElOfLine || nextElOfLine;

        arr.push(
          probability > this.positiveProbability
            ? currentElOfLine
            : isAlive
            ? 1
            : 0
        );
      }

      this.initArray.push(arr);

      if (j % this.probabilitySetPoint === 0) {
        this.setProbability();
      }

      if (j === this.iterations) {
        this.calculateEntropy();
      }
    }
  }

  start() {
    this.createContainer("ul", "id=field");
    this.setInit(this.count);
    this.applyPyramid(this.count);

    this.initArray.forEach((line, index) => {
      setTimeout(() => {
        this.draw(line);
      }, (index + 1) * 100);
    });
  }
}
