import { turnIntoJson } from "../helpers.js";
import { DB } from "../db.js";
import { generateId } from "../helpers.js";

export const registerUser = function (ws, data) {
  try {
    const dataUser = JSON.parse(data.data);
    const indexUser = generateId();

    const dataToSend = {
      type: data.type,
      data: {
        name: dataUser.name,
        index: indexUser,
        error: false,
        errorText: "ok",
      },
      id: data.id,
    };

    ws.send(turnIntoJson(dataToSend));

    DB.setUser({
      id: indexUser,
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
