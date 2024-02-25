import { DB } from "../db.js";
import { turnIntoJson } from "../helpers.js";
import { generateId } from "../helpers.js";
import { websocket } from "../ws-server/index.js";

export const createRoom = function (id) {
  try {
    let isUserCreatedRoom = false;
    const freeRooms = DB.getFreeRooms();
    freeRooms.forEach((freeRoom) => {
      const userInRoom = freeRoom.roomUsers.find((user) => user.index === id);
      isUserCreatedRoom = userInRoom ? true : false;
    });
    if (isUserCreatedRoom) {
      return;
    }

    const user = DB.getUser(id);
    const room = {
      roomId: generateId(),
      roomUsers: [
        {
          name: user.name,
          index: id,
        },
      ],
    };
    DB.setRoom(room);
    updateRoom();
  } catch (error) {
    console.error(error);
  }
};

export const updateRoom = function () {
  try {
    const data = DB.getFreeRooms();
    const dataToSend = {
      type: "update_room",
      data,
      id: 0,
    };
    const dataJson = turnIntoJson(dataToSend);
    websocket.clients.forEach((el) => el.send(dataJson));
  } catch (error) {
    console.error(error);
  }
};

export const addUser = function (ws, dataParsed, userId) {
  try {
    const roomId = JSON.parse(dataParsed.data).indexRoom;
    const freeRooms = DB.getFreeRooms();
    let userError = "";
    freeRooms.forEach((room) => {
      room.roomUsers.forEach((user) => {
        userError = user.index === userId;
      });
    });
    if (userError) {
      console.error("User already exists in the room");
      return;
    }

    const enemyUserId = freeRooms.find((el) => el.roomId === roomId)
      .roomUsers[0].index;
    const enemy = DB.getUser(enemyUserId);

    const clients = [
      { id: userId, ws },
      { id: enemyUserId, ws: enemy.ws },
    ];

    updateRoom();

    clients.forEach((el) => {
      const dataToSend = {
        type: "create_game",
        data: {
          idGame: roomId,
          idPlayer: el.id,
        },
        id: 0,
      };

      el.ws.send(turnIntoJson(dataToSend));
    });

    DB.fillRoom(roomId);
  } catch (error) {
    console.error(error);
  }
};
