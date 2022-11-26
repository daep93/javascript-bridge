const MissionUtils = require("@woowacourse/mission-utils");
const BridgeGame = require("./BridgeGame");
const { readBridgeSize, readMoving, readGameCommand } = require("./InputView");
const { makeBridge } = require("./BridgeMaker");
const { generate } = require("./BridgeRandomNumberGenerator");
const { printMap, printResult } = require("./OutputView");
class App {
  async play() {
    const bridgeSize = await readBridgeSize();
    const bridge = makeBridge(bridgeSize, generate);
    const bridgeGame = new BridgeGame(bridge);
    while (true) {
      const nextMove = await readMoving();
      const { moveSuccessed, lastStep } = bridgeGame.move(nextMove);
      printMap(bridge, lastStep, moveSuccessed);
      if (moveSuccessed && lastStep + 1 === bridgeSize) {
        printResult(bridgeGame.trial, bridge, lastStep, true);
        break;
      }
      if (!moveSuccessed) {
        const command = await readGameCommand();
        if (command === "R") bridgeGame.retry();
        else {
          printResult(bridgeGame.trial, bridge, lastStep, false);
          break;
        }
      }
    }
  }
}

module.exports = App;
