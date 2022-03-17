import { Pyramid, LifeGame } from "./figures";

const initGame = () => {
  const lifeGame = new LifeGame({
    fieldSize: 46,
    maximumIterations: 1000,
    random: {
      changingStateOfRandomCell: 0.7,
      cellStayDead: 0.17,
      cellStayAlive: 0.15,
    },
  });
  const pyramid = new Pyramid();

  return {
    initLifeGame: () => lifeGame.start(),
    initPyramid: () => pyramid.start(),
  };
};

const game = initGame();

game.initLifeGame();
