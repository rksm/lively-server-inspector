var subserverStart = require('./index.js'),
    tester = require('lively-pluggable-server'),
    port = 9003, server;

subserverStart.route = '/test';

var tests = {
    setUp: function (callback) {
        tester.start({port: port, subservers: [subserverStart]}, function(err, s) { server = s; callback(err); });
    },
    tearDown: function (callback) {
        tester.stop(server, callback);
    },
    testSimpleEval: function (test) {
        tester.post(server, subserverStart.route, {body: '2+1'}, function(err, res, body) {
            test.equal(body, '3', 'eval result');
            test.done();
        });
    }
};

module.exports = tests;
