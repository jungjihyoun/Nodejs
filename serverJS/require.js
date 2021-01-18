module.exports = ' find me ';

require('./var');

console.log("require.cache");
console.log(require.cache);

console.log('require.main');
console.log(require.main);

console.log(require.main.filename);

