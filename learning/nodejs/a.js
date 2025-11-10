// a.js
console.log('a start');
const b = require('./b');
console.log('a end', b);
module.exports = { name: 'module A' };