const getDb = require("../db").getDb;

module.exports = updateChatName = async (conversationId, name) => {
  try {
    const connection = await getDb();
    await connection
      .collection("conversations")
      .updateOne({ conversationId: conversationId }, { $set: { name: name } });
    return "ok";
  } catch (err) {
    console.log("updateChatName " + err.message);
    throw err;
  }
};
