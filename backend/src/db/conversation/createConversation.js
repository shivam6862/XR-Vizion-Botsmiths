const getDb = require("../db").getDb;

module.exports = createConversation = async (
  name,
  memberIds,
  newData,
  conversationId,
  messageHistory
) => {
  try {
    const connection = await getDb();
    const { insertedId } = await connection
      .collection("conversations")
      .insertOne({
        name: name,
        memberIds: memberIds,
        messages: newData,
        conversationId: conversationId,
        messageHistory: messageHistory,
      });
    return insertedId;
  } catch (err) {
    console.log("create Conversation file error:" + err.message);
    throw err;
  }
};
