export const turnIntoJson = function (obj) {
  for (const prop in obj) {
    if (Array.isArray(obj[prop])) {
      obj[prop].forEach((element) => {
        if (Array.isArray(element)) {
          element.forEach((el) => {
            el = JSON.stringify(el);
          });
        }
      });
      obj[prop] = JSON.stringify(obj[prop]);
    } else if (obj[prop] !== null && typeof obj[prop] === "object") {
      obj[prop] = turnIntoJson(obj[prop]);
    }
  }
  return JSON.stringify(obj);
};

export const generateId = function () {
  return Math.round(Math.random() * 100000000);
};
