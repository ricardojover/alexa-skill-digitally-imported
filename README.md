# alexa-skill-digitally-imported
Web server for your Amazon Alexa skill to play radios on Digitally Imported, Classical Radio, Radio Tunes, Jazz Radio and Rock Radio

<!-- TOC -->
- [Alexa DI.FM Skill for Node.js](#alexa-skill-digitally-imported)
	- [Overview](#overview)
	- [Creating your own skill for Alexa](#creating-your-own-skill-for-alexa)
	- [Setup Guide](#setup-guide)
	- [Getting Started](#getting-started)
	- [Tips](#tips)
<!-- /TOC -->

## Overview
It's been a while since Alexa is in our lives but even more Digitally Imported.

For any reason there's not an official way to listen DI.FM, Classical Radio or any other internet radio available with the same licence key. But many people is doing possible to listen them in an unofficial way.

If you have an Amazon Echo, a premium account in DI.FM and your own server in the cloud or at home you probably want to know more about this.

## Creating your own skill for Alexa
Login into your [Alexa's developer account](https://developer.amazon.com/alexa) and research a little bit on your own or go directly to the [Alexa Skills Kit Developer Console](https://developer.amazon.com/alexa/console/ask) and create a new skill.

You will need to:
- Enter an invocation name for your skill (this is the word(s) you will to begin an interaction with your skill). My invocation name is 'digitally imported' and that's why I can play music by saying 'tell `digitally imported` to play myChannel'.
- Add your intent(s). I only added one new intent called `PlayAudioIntent`, but if your goal is to create the skill the quickest possible just copy the content of the file 'interaction_model/model.json' and paste it in the JSON Editor. Then click on 'Save Model' on the top and done.
	- In my intent I use the utterance `Play {channel}`. This is what you will have to say after invoking the skill. 'tell digitally imported to `play myChannel`'
- Interfaces (located in the menu on the left side). Here you will have to enable the 'AudioPlayer' interface as provides directives and requests for streaming audio and monitoring playback progression.
- Endpoint. This MUST be https and will have to point to your server.

## Setup Guide
1. Clone the repo
```
https://github.com/ricardojover/alexa-skill-digitally-imported.git
```
2. Go to the repo and install dependencies
```
cd alexa-skill-digitally-imported.git
npm install
```
3. Customize the config file with your own settings.
4. Start the server
```
nodejs server.js
```

## Getting Started
You can now to tell digitally imported what you want to listen from your favourite channels as follows:
- `tell digitally imported to play myChannel`
- If the channel you say is not among your favourites Alexa will ask you what channel you want to play and you will only have to say the channel (not the full sentence).
- If you keep silence for 8 seconds because you are not sure of your favourite channels, Alexa will remind them to you and, again, you will only need to say the channel name.

Since I've created objects for every channel there are many possible options and configurations:
- baseURL. Here's where we say if it will have to go to di.fm, classicalradio.com, etc.
- suffix. This depends on the format (MP3 or AAC) and the web site (possible suffixes can be '_hi', '_aac', '').
- title, site and imageUrl are used for the cards you will see in your Alexa app.

Alexa will also tell you if there is a problem with the internet radio.

## Tips
[Host a Custom Skill as a Web Service](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html)
- The service must accept requests on port 443.

[Include a Card in Your Skill's Response](https://developer.amazon.com/fr/docs/custom-skills/include-a-card-in-your-skills-response.html)
- An image cannot be larger than 2 MB and it can be provided in the following formats:
	- JPEG
    - PNG
- When including an image, you provide two URLs: a smaller resolution image and a larger resolution image. The different sizes are used when displaying home cards on different sized screens:

	| Property | Description | Recommended Size (in pixels) |
	|----------|-------------|------------------------------|
	| smallImageUrl | Displayed on smaller screens | 720w x 480h |
	| largeImageUrl | Displayed on larger screens | 1200w x 800h |
