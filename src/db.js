export const DB = {
  _users: [],
  setUser: function (user) {
    this._users.push(user);
  },
  getUser: function (id) {
    return this._users.find((el) => el.id === id);
  },

  _rooms: [],
  setRoom: function (room) {
    this._rooms.push(room);
  },
  fillRoom: function (roomId) {
    const index = this._rooms.findIndex((room) => room.id === roomId);
    this._rooms.splice(index, 1);
  },
  getFreeRooms: function () {
    return this._rooms;
  },
  _winners: [],
  getWinners: function () {
    return this._winners;
  },
};
