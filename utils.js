var requestp = require('request-promise');

function getNgrokUrl() {
  return requestp({
    url: 'http://localhost:4040/api/tunnels',
    json: true
  })
    .then(function(body) {
      var url = body.tunnels[0].public_url;
      return url;
    })
    .catch(function(err) {
      console.log("ERROR: Failed to fetch ngrok url\n" + err)
    })
}

async function createWebhook(webex) {
  var ngrokUrl = await getNgrokUrl();
  var webhookName = 'bot-webhook'
  webex.webhooks.list()
    .then(webhooks => {
      var webhooksToDelete = []
      webhooks.items.forEach(webhook => {
        if (webhook.name === webhookName) {
          webhooksToDelete.push(webex.webhooks.remove(webhook))
        }
      })
      return Promise.all(webhooksToDelete)
    })
    .then(() => {
      return webex.webhooks.create({
        resource: 'messages',
        event: 'created',
        targetUrl: ngrokUrl,
        name: webhookName
      })
    })
    .catch(function(err) {
      console.log("ERROR: Failed to create webhook\n" + err)
    })
}

module.exports = {
  setUpWebhook: function(webex) {
    createWebhook(webex);
  }
};
