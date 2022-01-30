import { Pyramid, LifeGame } from "./figures";

const lifeGame = new LifeGame({
  fieldSize: 46,
  maximumIterations: 1000,
  random: {
    changingStateOfRandomCell: 0.7,
    cellStayDead: 0.17,
    cellStayAlive: 0.15,
  },
});

lifeGame.init();

// const pyramid = new Pyramid();

// pyramid.start();
