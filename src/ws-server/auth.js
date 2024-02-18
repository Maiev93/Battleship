import { turnIntoJson } from "../helpers.js";
import { DB } from "../db.js";

export const registerUser = function (ws, data, index) {
  try {
    const dataUser = JSON.parse(data.data);

    const dataToSend = {
      type: data.type,
      data: {
        name: dataUser.name,
        index,
        error: false,
        errorText: "ok",
      },
      id: data.id,
    };

    ws.send(turnIntoJson(dataToSend));

    DB.setUser({
      id: index,
      name: dataUser.name,
      password: dataUser.password,
    });
    console.log("IN AUTH", turnIntoJson(dataToSend));
  } catch (error) {
    const dataToSend = {
      type: data.type,
      data: {
        name: "",
        index: "",
        error: true,
        errorText: error,
      },
      id: data.id,
    };
    ws.send(turnIntoJson(dataToSend));
  }
};
