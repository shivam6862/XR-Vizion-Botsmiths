const getDb = require("../db").getDb;
const { v4 } = require("uuid");

module.exports = deleteUserChat = async (conversationId) => {
  try {
    const connection = await getDb();
    await connection
      .collection("conversations")
      .deleteOne({ conversationId: conversationId });
    return "success";
  } catch (err) {
    console.log("delete User Chat file error:" + err.message);
    throw err;
  }
};
