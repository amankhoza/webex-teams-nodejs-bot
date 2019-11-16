const utils = require('./utils')
const express = require('express')

const app = express()
app.use(express.json())

ACCESS_TOKEN = '<insert_your_access_token_here>'

const Webex = require('webex');
const webex = Webex.init({
  credentials: {
    access_token: ACCESS_TOKEN
  }
});

utils.setUpWebhook(webex)

webex.people.get('me')
  .then(function (myDetails) {
    global.myId = myDetails.id
    app.listen(5000)
    console.log("Listening on port 5000")
  })
  .catch(function(err) {
    console.log("ERROR: Failed to fetch bot details\n" + err)
  })

app.post('/', function (req, res) {
  res.sendStatus(200)
  if (req.body.data.personId === global.myId)
    return
  processMessage(req.body.data)
})

async function processMessage(messageData) {
  var sender = await webex.people.get(messageData.personId);
  var message = await webex.messages.get(messageData.id);
  var response = 'Hi ' + sender.firstName + ' your message was "' + message.text + '"'
  if (message.roomType === 'direct')
    sendDirectMessage(message.personEmail, response)
  if (message.roomType === 'group')
    sendMessageInRoom(message.roomId, response)
}

function sendDirectMessage(personEmail, message) {
  webex.messages.create({ toPersonEmail: personEmail, markdown: message });
}

function sendMessageInRoom(roomId, message) {
  webex.messages.create({ roomId: roomId, markdown: message });
}
