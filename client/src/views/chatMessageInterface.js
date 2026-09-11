const readline = require("readline");
const io = require("socket.io-client");
const exitApp = require("../menu/exitApp");
const getMenuOption = require("./getMenuOption");
const render = require("./renderInterface");
const attachEvents = require("../../attachEvents");
const serverUrl = require("../config");

function chatMessageInterface(client, chatRoom, authToken) {
  console.info("----------------------------------------------");
  console.info("Press -h to go Home.");
  console.info("Press -e to Exit.");
  console.info("----------------------------------------------");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", async (input) => {
    const message = input.trim();
    if (message === "-e") {
      rl.close(); // Close the readline interface
      exitApp();
    } else if (message === "-h") {
      client.disconnect();

      // create a new client connection
      const newClient = io(serverUrl, {
        auth: {
          token: authToken,
        },
      });

      // Attach events to newClient
      attachEvents(newClient);

      // Display Home menu after successful authentication
      const homeOption = await getMenuOption();

      // Render menu interface according to what the user selects
      const chatRoom = await render[homeOption](newClient);

      // Start chat room messaging
      chatMessageInterface(newClient, chatRoom, authToken);
    }
    client.emit("chat message", chatRoom, message);
  });
}

module.exports = chatMessageInterface;
