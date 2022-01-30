import { Base } from "./Base";

export class LifeGame extends Base {
  constructor() {
    super();
    this.fieldSize = 23;
    this.field = [];
  }

  setValues() {
    for (let i = 0; i < this.fieldSize; i++) {
      const line = [];

      for (let j = 0; j < this.fieldSize; j++) {
        line.push(0);
      }

      this.field.push(line);
    }
  }

  makeGlider() {
    // Count from "0"
    const livingCells = [
      {
        lineIndex: 9,
        cellIndex: 11,
      },
      {
        lineIndex: 10,
        cellIndex: 10,
      },
      {
        lineIndex: 10,
        cellIndex: 12,
      },
      {
        lineIndex: 11,
        cellIndex: 11,
      },
      {
        lineIndex: 12,
        cellIndex: 10,
      },
      {
        lineIndex: 12,
        cellIndex: 12,
      },
      {
        lineIndex: 13,
        cellIndex: 11,
      },
    ];

    this.field.forEach((line, lineIndex) => {
      line.forEach((_, cellIndex) => {
        const isLivingCell = livingCells.find(
          (livingCell) =>
            livingCell.lineIndex === lineIndex &&
            livingCell.cellIndex === cellIndex
        );

        this.field[lineIndex][cellIndex] = isLivingCell ? 1 : 0;
      });
    });
  }

  start() {
    this.createContainer("ul");
    this.setValues();
    this.makeGlider();
    this.field.forEach((line, index) => {
      setTimeout(() => {
        this.draw(line);
      }, (index + 1) * 200);
    });
  }
}
