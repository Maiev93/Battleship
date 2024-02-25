import { WebSocketServer } from "ws";
import { registerUser } from "./auth.js";
import { updateRoom, createRoom, addUser } from "./room.js";
import { updateWinners } from "./winners.js";
import { addShips, attack } from "./game.js";
import { generateId } from "../helpers.js";

export const websocket = new WebSocketServer({
  port: 3000,
});

const clients = [];

websocket.on("connection", function connection(ws) {
  ws.on("error", console.error);

  const myId = generateId();
  clients.push({ [myId]: ws });

  ws.on("message", function message(data) {
    const dataParsed = JSON.parse(data);
    switch (dataParsed.type) {
      case "reg":
        registerUser(ws, dataParsed, myId);
        updateRoom();
        updateWinners(ws);
        break;
      case "create_room":
        createRoom(myId);
        break;
      case "add_user_to_room":
        addUser(ws, dataParsed, myId);
        break;
      case "add_ships":
        addShips(ws, dataParsed);
        break;
      case "attack":
      case "randomAttack":
        attack(dataParsed);
        break;
      case "single_play":
        startGame();
        break;
      default:
        break;
    }
  });
});
