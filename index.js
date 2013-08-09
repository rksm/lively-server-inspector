var util = require('util');

module.exports = function(route, app, subserver) {
    app.post(route, function(req, res) {
        var data = '';
        req.on('data', function(d) { data += typeof d === 'string' ? d : d.toString(); });
        req.on('end', function() {
            try { res.end(String(eval(data))); } catch(e) {
                res.status(400); res.end(String(e)); }
        });
    });
}
