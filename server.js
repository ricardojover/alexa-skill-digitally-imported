'use strict';

var config = require('./config');
var lambda = require('./lambda');
var express = require('express');
var request = require('request');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var context = require('aws-lambda-mock-context');

const httpsOptions = {
    key: fs.readFileSync(config.certs.privateKey),
    cert: fs.readFileSync(config.certs.certificate)
};

var app = express();
app.use(bodyParser.json({ type: 'application/json' })); //body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.

function getActualURL(channel) {
    let channels = config.diFM.channels;
    let channelObject = channels[channel];
    let url = channelObject.baseUrl + channel.toLowerCase() + channelObject.suffix + '?' + config.diFM.listenKey;

    return url;
}

// https://<your-url>/alexa-di-fm is your endpoing URL in your skill.
app.post('/alexa-di-fm/', function (req, res) {
    let ctx = context();
    lambda.handler(req.body, ctx);
    ctx.Promise
        .then(resp => {  return res.status(200).json(resp); })
        .catch(err => {  console.log(err); })
});

app.get('/di/:channel', function (req, res) {
    let url = getActualURL(req.params.channel);
    if (req.query.validate == '1') {
        console.log("Validating URL '" + url + "'");
        request.get(url).on('response', function (response) {
            res.sendStatus(response.statusCode); // e.g. res.sendStatus(200); // equivalent to res.status(200).send('OK')
        });
    } else {
        console.log("Creating http-to-https proxy");
        let proxyRequest = request(url);
        req.pipe(proxyRequest);
        proxyRequest.pipe(res);
    }
});

var httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(config.httpsServer.port, function () {
    console.log("Server started on " + this.address().address + ":" + this.address().port);
});
