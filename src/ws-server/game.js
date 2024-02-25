import { turnIntoJson } from "../helpers.js";

const games = [];
let attackedPlayer = 0;

export const addShips = function (ws, data) {
  const parsed = JSON.parse(data.data);
  games.push({
    gameId: parsed.gameId,
    indexPlayer: parsed.indexPlayer,
    ships: parsed.ships,
    shipsPositions: transformPositions(parsed.ships),
    ws,
  });

  const fulledGame = games.filter((el) => el.gameId === parsed.gameId);
  if (fulledGame.length > 1) {
    fulledGame.forEach((el) => {
      createGame(el.indexPlayer, el.ships, el.ws);
    });
  }

  sendTurn(fulledGame);
};

function createGame(playerId, ships, ws) {
  const dataToSend = {
    type: "start_game",
    ships,
    currentPlayerIndex: playerId,
  };
  ws.send(turnIntoJson(dataToSend));
}

export const sendTurn = function (game, turnId = 0) {
  game.forEach((el) => {
    const dataToSend = {
      type: "turn",
      data: {
        currentPlayer: turnId === 0 ? game[0].indexPlayer : turnId,
      },
      id: 0,
    };
    el.ws.send(turnIntoJson(dataToSend));
  });

  attackedPlayer = turnId === 0 ? game[0].indexPlayer : turnId;
};

export const attack = function (data) {
  const parsedData = JSON.parse(data.data);
  const { gameId, indexPlayer } = parsedData;
  if (attackedPlayer !== indexPlayer) {
    return;
  }

  const coords = parsedData.x
    ? { x: parsedData.x, y: parsedData.y }
    : { x: randomPoints(), y: randomPoints() };

  const gameCurrent = games.filter((el) => el.gameId === gameId);
  const enemy = gameCurrent.find((el) => el.indexPlayer !== indexPlayer);

  let status = "miss";
  enemy.shipsPositions.forEach((el) => {
    const elIndex = el.position.findIndex(
      (elem) => elem.x === coords.x && elem.y === coords.y
    );
    if (elIndex != -1) {
      el.position.splice(elIndex, 1);
      status = el.position.length > 0 ? "shot" : "killed";
    }
  });

  gameCurrent.forEach((el) => {
    const dataToSend = {
      type: "attack",
      data: {
        position: coords,
        currentPlayer: indexPlayer,
        status,
      },
      id: 0,
    };
    el.ws.send(turnIntoJson(dataToSend));
  });

  if (status === "miss") {
    sendTurn(gameCurrent, enemy.indexPlayer);
  } else {
    sendTurn(gameCurrent, indexPlayer);
  }
};

function transformPositions(array) {
  const ships = array.map((el) => {
    const newArr = [];
    const { x, y } = el.position;
    for (let index = 0; index < el.length; index++) {
      if (el.direction) {
        newArr.push({ x, y: y + index });
      } else {
        newArr.push({ x: x + index, y });
      }
    }
    return { position: newArr };
  });
  return ships;
}

function randomPoints() {
  const min = 0;
  const max = 9;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
