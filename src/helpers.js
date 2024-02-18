export const turnIntoJson = function (obj) {
  for (const prop in obj) {
    if (Array.isArray(obj[prop])) {
      const newArr = [];
      for (let index = 0; index < obj[prop].length; index++) {
        const element = turnIntoJson(obj[prop][index]);
        newArr.push(element);
      }
      obj[prop] = newArr;
    } else if (obj[prop] !== null && typeof obj[prop] === "object") {
      obj[prop] = turnIntoJson(obj[prop]);
    }
  }

  return JSON.stringify(obj);
};

export const generateId = function () {
  return Math.round(Math.random() * 100000000);
};
