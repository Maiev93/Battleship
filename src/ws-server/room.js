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

export const createRoom = function (ws) {
  try {
    DB.setroom();
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
