import { turnIntoJson } from "../helpers.js";
import { sendTurn } from "./game.js";

const botId = 12345678;
const botRoomID = 87654321;
const botWs = {
  send: function (data) {
    const dataParsed = JSON.stringify(data);
    // console.log(data.type, " was sended");
  },
};

export const startGame = function (ws, playerId) {
  const dataToSend = {
    type: "create_game",
    data: {
      idGame: botRoomID,
      idPlayer: playerId,
    },
    id: 0,
  };

  ws.send(turnIntoJson(dataToSend));
  sendTurn(ws, playerId);
};

function generateShips() {
  const ships = [
    {
      position: { x: 4, y: 1 },
      direction: !!Math.round(Math.random()),
      type: "huge",
      length: 4,
    },
    {
      position: { x: 0, y: 2 },
      direction: !!Math.round(Math.random()),
      type: "large",
      length: 3,
    },
    {
      position: { x: 4, y: 6 },
      direction: !!Math.round(Math.random()),
      type: "large",
      length: 3,
    },
    {
      position: { x: 7, y: 6 },
      direction: !!Math.round(Math.random()),
      type: "medium",
      length: 2,
    },
    {
      position: { x: 8, y: 2 },
      direction: !!Math.round(Math.random()),
      type: "medium",
      length: 2,
    },
    {
      position: { x: 0, y: 7 },
      direction: !!Math.round(Math.random()),
      type: "medium",
      length: 2,
    },
    {
      position: { x: 6, y: 3 },
      direction: !!Math.round(Math.random()),
      type: "small",
      length: 1,
    },
    {
      position: { x: 6, y: 0 },
      direction: !!Math.round(Math.random()),
      type: "small",
      length: 1,
    },
    {
      position: { x: 2, y: 0 },
      direction: !!Math.round(Math.random()),
      type: "small",
      length: 1,
    },
    {
      position: { x: 7, y: 9 },
      direction: !!Math.round(Math.random()),
      type: "small",
      length: 1,
    },
  ];

  ships.forEach((ship) => {
    ship.position = { x: 0, y: 0 };
  });

  return ships;
}
// console.log(generateShips());
