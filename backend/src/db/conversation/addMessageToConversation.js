const getDb = require("../db").getDb;
const { v4 } = require("uuid");

module.exports = addMessageToConversation = async (
  messageText,
  userId,
  conversationId,
  isimage,
  messageHistory,
  timeTaken,
  queryCost
) => {
  try {
    const newId = v4();
    const newMessage = {
      id: newId,
      text: messageText,
      postedById: userId,
      isimage: isimage,
      timeTaken,
      queryCost,
    };
    const connection = await getDb();
    await connection.collection("conversations").updateOne(
      { conversationId: conversationId },
      {
        $push: { messages: newMessage },
        $set: { messageHistory: messageHistory },
      }
    );
    return "ok";
  } catch (err) {
    console.log("add Message To Conversation file error:" + err.message);
    throw err;
  }
};
