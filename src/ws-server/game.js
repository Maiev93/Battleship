import { turnIntoJson } from "../helpers.js";

const games = [];
export const addShips = function (ws, data) {
  const parsed = JSON.parse(data.data);
  games.push({
    gameId: parsed.gameId,
    indexPlayer: parsed.indexPlayer,
    ships: parsed.ships,
    ws,
  });

  const fulledGame = games.filter((el) => el.gameId === parsed.gameId);
  if (fulledGame.length > 1) {
    fulledGame.forEach((el) => {
      createGame(el.indexPlayer, el.ships, el.ws);
    });
  }

  sendTurn(fulledGame, true);
};

function createGame(playerId, ships, ws) {
  const dataToSend = {
    type: "start_game",
    ships,
    currentPlayerIndex: playerId,
  };
  ws.send(turnIntoJson(dataToSend));
}

export const sendTurn = function (game, isFirst = false) {
  if (isFirst) {
    game.forEach((el) => {
      const dataToSend = {
        type: "turn",
        data: {
          currentPlayer: game[0].indexPlayer,
        },
        id: 0,
      };
      el.ws.send(turnIntoJson(dataToSend));
    });
  } else {
    ///
  }
};
