const admin = require("firebase-admin");
const serviceAccount = require("./cribstock-6cbda-firebase-adminsdk-8ib18-bc3e39bb98.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const payload = {
  notification: {
    title: "Another Bank Alert!!!",
    body: "N3,000,000 just dropped. Login to view details.",
  },
};

const options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

// Send a message to the device corresponding to the provided
// registration token.
function sendNotif(arrayOfRegTokens, title, body, otherDataObj) {
  console.log("hkdddld");
  if (!arrayOfRegTokens || !title || !body) return { error: "supply all parameters" };
  const payload = {
    notification: {
      title,
      body,
    },
    data: {
      ...otherDataObj,
    },
  };
  admin
    .messaging()
    .sendToDevice(arrayOfRegTokens, payload, options)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

module.exports = { sendNotif };
