import { WebSocketServer } from "ws";
import { registerUser } from "./auth.js";
import { updateRoom, createRoom } from "./room.js";
import { updateWinners } from "./winners.js";

export const websocket = new WebSocketServer({
  port: 3000,
});

const clients = [];

websocket.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("income data: ", data);
    const dataParsed = JSON.parse(data);
    console.log("dataParsed", dataParsed);
    switch (dataParsed.type) {
      case "reg":
        registerUser(ws, dataParsed);
        updateRoom(ws);
        updateWinners(ws);
        break;
      case "create_room":
        console.log(ws);
        createRoom(ws);
        break;

      default:
        break;
    }
  });
});
