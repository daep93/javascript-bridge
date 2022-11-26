const { Console } = require("@woowacourse/mission-utils");

const checkBridgeSizeValid = (bridgeSize) =>
  Number.isInteger(bridgeSize) && bridgeSize >= 3 && bridgeSize <= 20;
const checkMovingValid = (moving) => ["U", "D"].includes(moving);
const checkGameCommandValid = (gameCommand) => ["R", "Q"].includes(gameCommand);
/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {
    return new Promise((resolve) => {
      Console.readLine(
        "다리 건너기 게임을 시작합니다.\n다리의 길이를 입력해주세요.",
        async (bridgeSizeStr) => {
          const bridgeSize = +bridgeSizeStr;
          try {
            if (!checkBridgeSizeValid(bridgeSize))
              throw "[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.";
            resolve(bridgeSize);
          } catch (error) {
            Console.print(error);
            resolve(await InputView.readBridgeSize());
          }
        }
      );
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving() {
    return new Promise((resolve) => {
      Console.readLine(
        "이동할 칸을 선택해주세요. (위: U, 아래: D)",
        async (moving) => {
          try {
            if (!checkMovingValid(moving))
              throw "[ERROR] 입력값은 'U' 또는 'D'만 허용합니다.";
            resolve(moving);
          } catch (error) {
            Console.print(error);
            resolve(await InputView.readMoving());
          }
        }
      );
    });
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {
    return new Promise((resolve) => {
      Console.readLine(
        "게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)",
        async (gameCommand) => {
          try {
            if (!checkGameCommandValid(gameCommand))
              throw "[ERROR] 입력값은 'R 또는 'Q'만 허용됩니다.";
            resolve(command);
          } catch (error) {
            Console.print(error);
            resolve(await InputView.readGameCommand());
          }
        }
      );
    });
  },
};

module.exports = InputView;
