import { WebSocketServer } from "ws";
import { httpServer } from "../http_server/index.js";

export const websocket = new WebSocketServer({
  port: 3000,
});

const clients = [];

websocket.on("connection", function connection(ws, request, client) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log(`Received message ${data} from user ${client}`);
  });
});
