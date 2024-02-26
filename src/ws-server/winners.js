import { DB } from "../db.js";
import { turnIntoJson } from "../helpers.js";
import { websocket } from "../ws-server/index.js";
import { updateRoom } from "./room.js";

export const updateWinners = function () {
  try {
    const data = DB.getWinners();
    const dataToSend = {
      type: "update_winners",
      data,
      id: 0,
    };
    const dataJson = turnIntoJson(dataToSend);

    websocket.clients.forEach((el) => el.send(dataJson));
  } catch (error) {
    console.error(error);
  }
};

export const setWinner = function (indexPlayer) {
  try {
    const user = DB.getUser(indexPlayer);
    const winners = DB.getWinners();
    const userWinner = winners.find((el) => el.name === user.name);
    if (userWinner) {
      userWinner.wins += userWinner.wins;
    } else {
      const winnerData = {
        name: user.name,
        wins: 1,
      };
      DB.setWinner(winnerData);
    }

    updateWinners();
    updateRoom();
  } catch (error) {
    console.error(error);
  }
};
