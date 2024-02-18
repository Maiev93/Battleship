// {
//     type: "update_winners",
//     data:
//         [
//             {
//                 name: <string>,
//                 wins: <number>,
//             }
//         ],
//     id: 0,
// }

import { DB } from "../db.js";
import { turnIntoJson } from "../helpers.js";

export const updateWinners = function (ws) {
  try {
    const data = DB.getWinners();
    const dataToSend = {
      type: "update_winners",
      data,
      id: 0,
    };

    ws.send(turnIntoJson(dataToSend));
  } catch (error) {
    console.error(error);
  }
};
