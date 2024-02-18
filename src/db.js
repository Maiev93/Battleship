export const DB = {
  _users: [],
  setUser: function (user) {
    this._users.push(user);
  },
  _rooms: [],
  setroom: function (room) {
    this._rooms.push(room);
  },
  getFreeRooms: function () {
    return this._rooms.filter((el) => el.roomUsers.length === 1);
  },
  _winners: [],
  getWinners: function () {
    return this._winners;
  },
};
