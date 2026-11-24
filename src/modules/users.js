const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = () => fs.promises.readFile(usersPath, 'utf8');

module.exports = { getUsers };
