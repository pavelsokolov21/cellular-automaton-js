import { getRandomArbitrary } from "../utils";
import { Base } from "./Base";

export class LifeGame extends Base {
  constructor(config) {
    super();
    this.generationContainer = null;
    this.field = [];
    this.generation = 1;
    this.config = config;
  }

  setValues() {
    // The field should be square
    for (let i = 0; i < this.config.fieldSize; i++) {
      const line = [];

      for (let j = 0; j < this.config.fieldSize; j++) {
        line.push(0);
      }

      this.field.push(line);
    }
  }

  initGlider() {
    // Count from "0"
    const livingCells = [
      {
        lineIndex: 10,
        cellIndex: 11,
      },
      {
        lineIndex: 10,
        cellIndex: 10,
      },
      {
        lineIndex: 9,
        cellIndex: 12,
      },
      {
        lineIndex: 11,
        cellIndex: 11,
      },
      {
        lineIndex: 13,
        cellIndex: 11,
      },
      {
        lineIndex: 13,
        cellIndex: 12,
      },
      {
        lineIndex: 15,
        cellIndex: 11,
      },
      {
        lineIndex: 15,
        cellIndex: 10,
      },
      {
        lineIndex: 15,
        cellIndex: 12,
      },
      {
        lineIndex: 14,
        cellIndex: 12,
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

  getNeighbors(coordinates) {
    // Coordinates start from "0"
    const { x, y } = coordinates;
    const lastIndex = this.config.fieldSize - 1;

    const top = y === 0 ? this.field[lastIndex][x] : this.field[y - 1][x];
    const right = x === lastIndex ? this.field[y][0] : this.field[y][x + 1];
    const bottom = y === lastIndex ? this.field[0][x] : this.field[y + 1][x];
    const left = x === 0 ? this.field[y][lastIndex] : this.field[y][x - 1];
    const topLeft =
      x === 0 && y === 0
        ? this.field[lastIndex][lastIndex]
        : y === 0
        ? this.field[lastIndex][x - 1]
        : x === 0
        ? this.field[y - 1][lastIndex]
        : this.field[y - 1][x - 1];
    const topRight =
      x === lastIndex && y === 0
        ? this.field[lastIndex][0]
        : y === 0
        ? this.field[lastIndex][x + 1]
        : x === lastIndex
        ? this.field[y - 1][0]
        : this.field[y - 1][x + 1];
    const bottomRight =
      x === lastIndex && y === lastIndex
        ? this.field[0][0]
        : y === lastIndex
        ? this.field[0][x + 1]
        : x === lastIndex
        ? this.field[y + 1][0]
        : this.field[y + 1][x + 1];
    const bottomLeft =
      x === 0 && y === lastIndex
        ? this.field[0][lastIndex]
        : y === lastIndex
        ? this.field[0][x - 1]
        : x === 0
        ? this.field[y + 1][lastIndex]
        : this.field[y + 1][x - 1];

    return {
      top,
      right,
      bottom,
      left,
      topRight,
      bottomRight,
      bottomLeft,
      topLeft,
    };
  }

  initField() {
    this.field.forEach((line, index) => {
      this.draw(line, index);
    });
  }

  drawLife() {
    this.field.forEach((line, lineIndex) => {
      line.forEach((cellValue, cellIndex) => {
        const cellByCoord = this.container.querySelector(
          `[data-x="${cellIndex}"][data-y="${lineIndex}"]`
        );

        cellByCoord.classList.toggle("active", cellValue === 1);
      });
    });

    this.generation++;

    this.generationContainer.textContent = `Generation: ${this.generation}`;
  }

  changeStateOfRandomCell(chance) {
    const random = Math.random();

    if (chance > random) {
      const y = getRandomArbitrary(0, this.config.fieldSize - 1);
      const x = getRandomArbitrary(0, this.config.fieldSize - 1);

      this.field[y][x] = this.field[y][x] === 1 ? 0 : 1;
    }
  }

  makeGlider(iterations = 1000) {
    for (let i = 0; i < iterations; i++) {
      setTimeout(() => {
        this.changeStateOfRandomCell(
          this.config.random.changingStateOfRandomCell
        );

        this.field = this.field.map((line, lineIndex) => {
          return line.map((cell, cellIndex) => {
            const neighbors = Object.values(
              this.getNeighbors({ y: lineIndex, x: cellIndex })
            );
            const livingNeighborsCount = neighbors.filter(Boolean).length;

            // If a cell is dead
            if (cell === 0) {
              if (livingNeighborsCount === 3) {
                const random = Math.random();

                return random > this.config.random.cellStayDead ? 1 : 0;
              }

              return 0;
            }

            // If a cell is alive and doesn't have 2 or 3 neighbors then it will die
            if (livingNeighborsCount < 2 || livingNeighborsCount > 3) {
              const random = Math.random();

              return random > this.config.random.cellStayAlive ? 0 : 1;
            }

            return 1;
          });
        });

        this.drawLife();
      }, i * 250);
    }
  }

  createStartButton() {
    const button = document.createElement("button");
    button.textContent = "Start";

    button.addEventListener("click", () => {
      this.start();
    });

    document.querySelector("body").append(button);
  }

  createCounter() {
    const counter = document.createElement("div");
    counter.classList.add("counter");
    counter.innerText = `Generation: ${this.generation}`;

    this.generationContainer = counter;

    document.querySelector("body").append(counter);
  }

  init() {
    this.createContainer("ul", "id=life-game");
    this.setValues();
    this.initGlider();
    this.initField();
    this.createStartButton();
    this.createCounter();
    // this.makeGlider();
  }

  start() {
    this.makeGlider();
  }
}
