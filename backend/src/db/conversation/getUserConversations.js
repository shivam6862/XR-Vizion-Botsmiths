const getDb = require("../db").getDb;

module.exports = getUserConversations = async (userId) => {
  try {
    const connection = await getDb();
    const conversations = await connection
      .collection("conversations")
      .find({ memberIds: userId })
      .toArray();
    const namesAndIds = conversations.map((item) => ({
      id: item.conversationId,
      name: item.name,
    }));
    return namesAndIds;
  } catch (err) {
    console.log("getUserConversations " + err.message);
    throw err;
  }
};
