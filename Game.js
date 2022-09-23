const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  name: String,
  gameData: String,
});

module.exports = mongoose.model('Game', gameSchema);