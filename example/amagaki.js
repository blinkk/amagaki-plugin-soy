const htmPlugin = require('../dist/src/htmPlugin');

module.exports = function(pod) {
    htmPlugin.register(pod);
}