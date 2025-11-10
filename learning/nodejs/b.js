// b.js
console.log('b start');
const a = require('./a');
console.log('b end', a);
module.exports = { name: 'module B' };