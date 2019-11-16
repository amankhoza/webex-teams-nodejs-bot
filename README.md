# Create a Webex Teams bot

## 1) Create a Webex accont 

Visit [developer.cisco.com](https://developer.webex.com/docs/bots), create an account and then click on the create a bot button and follow the steps.

Once you have created the bot note down the address of the bot and the access token, you will need these later.

## 2) Install Node.js and dependencies

Install [Node.js](https://nodejs.org/en/download/) for your OS, and then install the necessary dependencies by running the following command:

```
npm install --save webex express request-promise
```

## 3) Download and run ngrok

Ngrok is a nifty little tool that allows you to expose your localhost to the internet. We will need to do this so that the Webex Teams Cloud knows where to send events to when your bot start receiving messages. Download the ngrok binary from [here](https://ngrok.com/download).

Extract the downloaded binary, then `cd` to the directory the binary is in and run the following:

```
./ngrok http 5000
```
Leave this running in the background.

## 4) Clone repo and run bot
On a separate terminal run:
```
git clone https://github.com/amankhoza/webex-teams-nodejs-bot.git
cd webex-teams-nodejs-bot
```
Now edit `bot.js` and replace `<insert_your_access_token_here>` with your own access token.

Finally run the bot with:
```
node bot.js
```

## 5) Verify everything is working

Now message the bot on Webex Teams and verify you receive a response.
