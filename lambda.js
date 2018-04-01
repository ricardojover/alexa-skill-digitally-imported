'use strict';

var config  = require('./config');
var Alexa   = require('alexa-sdk');
var request = require("request");

const myChannels   = config.diFM.channels;

exports.handler = function (event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = config.alexa.appID;
    if (event.context && event.context.System.application.applicationId == 'applicationId') {
        event.context.System.application.applicationId = event.session.application.applicationId;
    }
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function getChannelsList() {
    let chArray = Object.keys(myChannels);
    let channelsList = '';

    for (var i = 0; i < chArray.length; i++) {
        channelsList += chArray[i];
        if (i == chArray.length - 1) { break; }
 
        if (i == chArray.length - 2) { channelsList += ' and '; }
        else { channelsList += ', '; }
    }
    return channelsList;
}

function getURL(channelName, validate) {
    validate = validate ? "1" : "0";
    let url = "https://" + config.server.url + "/" + channelName.replace(/\s+/g, '') + "?validate=" + validate;
    return url;
}

function launch(alexa) {
    alexa.response.speak("Tell Digital Imported what channel you want to play");
    stop(alexa);
}

function playChannel(alexa, channelName) {
    let cardTitle, cardBody, cardImage;
    let channelObject = myChannels[channelName];
    let message = "Playing " + channelObject.title;
    
	cardImage = {
        smallImageUrl: channelObject.imageUrl,
        largeImageUrl: channelObject.imageUrl
    };
    cardTitle = channelObject.site;
    cardBody = channelObject.title;
    console.log(message);
    alexa.response.cardRenderer(cardTitle, cardBody, cardImage);
    alexa.response.speak(message);

    let url = getURL(channelName, false);
    alexa.response.audioPlayerPlay('REPLACE_ALL', url, "token", null, 0);
}

function play(alexa) {
    let channelName = null;
    let slots = alexa.event.request.intent.slots;
    console.log('Alexa searching requested channel')
    if (slots && slots.Channel) {
        channelName = slots.Channel.value;
    }
    
    if(myChannels[channelName] == undefined) {
        console.log("Requested channel '"+channelName+"' not found");
	    let not_valid = '';
	    if (channelName != undefined) {
	        not_valid = "The channel " + channelName + " is not a valid channel.";
	    } else {
	        not_valid = "I'm sorry, I didn't understand.";
	    }

	    let question = not_valid + " What channel do you want to play ?";
	    alexa.response.speak(question);
	    alexa.response.listen("The valid channels are " + getChannelsList()); // Alexa will remind the user what are the available channels if does't reply in 8 seconds.
	    alexa.emit(":responseReady");

	    console.log("Waiting for user response after invalid channel " + channelName);

        stop(alexa); 

	    return;
    }

    tryPlayChannel(alexa, channelName);
}

function tryPlayChannel(alexa, channelName) {
    let url = getURL(channelName, true);

    request.get(url, function (error, response, body) {
        switch (body) {
            case "OK":
                playChannel(alexa, channelName);
                break;
            case "Not Found":
                alexa.response.speak("Digital imported does not have a " + channelName + " channel");
                stop(alexa);
                break;
            case "Unauthorized":
                alexa.response.speak("The listen key you are using is not valid");
                break;
            default:
                alexa.response.speak("The web site has return the code " + body);
                break;
        }

        alexa.emit(':responseReady');
    });    
}

function stop(alexa) {
    alexa.response.audioPlayerStop();
    alexa.emit(':responseReady');
}

var handlers = {
    'PlayAudioIntent': function () {
        play(this);
    },
    'LaunchRequest': function() {
        launch(this);
    },
    'Unhandled': function () {
        this.response.speak("I couldn't understand. Please, try again");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        stop(this);
    },
    'AMAZON.StopIntent' : function() {
        stop(this);
    },
    'AMAZON.PauseIntent' : function() {
        stop(this);
    },
    'AMAZON.ResumeIntent' : function() {
        play(this);
    },
};
