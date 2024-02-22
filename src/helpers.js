export const turnIntoJson = function (obj) {
  for (const prop in obj) {
    if (obj[prop] !== null && typeof obj[prop] === "object") {
      obj[prop] = JSON.stringify(obj[prop]);
    }
  }
  return JSON.stringify(obj);
};

export const generateId = function () {
  return Math.round(Math.random() * 100000000);
};
