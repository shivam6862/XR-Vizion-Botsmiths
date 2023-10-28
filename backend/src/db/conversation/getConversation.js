const getDb = require("../db").getDb;

module.exports = getConversation = async (conversationId) => {
  try {
    const connection = await getDb();
    const conversation = await connection
      .collection("conversations")
      .findOne({ conversationId: conversationId });

    const populatedConversation = conversation.messages;
    const messageHistory = conversation.messageHistory;

    for (const conversation of populatedConversation) {
      if (conversation.postedById === process.env.CHATBOT_ID) {
        conversation.isUser = "false";
      } else {
        conversation.isUser = "true";
      }
    }
    return { populatedConversation, messageHistory };
  } catch (err) {
    console.log("get Conversation file error:" + err.message);
    throw err;
  }
};
