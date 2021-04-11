const soyPlugin = require('../dist/src/soyPlugin');

module.exports = function(pod) {
    soyPlugin.register(pod);
}