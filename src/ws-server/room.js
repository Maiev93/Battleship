// {
//     type: "create_room",
//     data: "",
//     id: 0,
// }
// data:
//         [
//             {
//                 roomId: <number>,
//                 roomUsers:
//                     [
//                         {
//                             name: <string>,
//                             index: <number>,
//                         }
//                     ],
//             },
//         ],
import { DB } from "../db.js";
import { turnIntoJson } from "../helpers.js";
import { generateId } from "../helpers.js";

export const createRoom = function (ws, id) {
  try {
    const room = {
      roomId: generateId(),
      roomUsers: [id],
    };
    DB.setRoom(room);
    updateRoom(ws);
  } catch (error) {
    console.error(error);
  }
};

export const updateRoom = function (ws) {
  try {
    const data = DB.getFreeRooms();
    const dataToSend = {
      type: "update_room",
      data,
      id: 0,
    };

    ws.send(turnIntoJson(dataToSend));
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
        userError = user === userId;
      });
    });
    if (userError) {
      console.error("User already exists in the room");
      return;
    }

    const enemyUserId = freeRooms.find((el) => el.roomId === roomId)
      .roomUsers[0];
    const enemy = DB.getUser(enemyUserId);

    const clients = [
      { id: userId, ws },
      { id: enemyUserId, ws: enemy.ws },
    ];

    clients.forEach((el) => {
      updateRoom(el.ws);

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
