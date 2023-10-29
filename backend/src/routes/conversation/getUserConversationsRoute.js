const getUserConversations = require("../../db/conversation/getUserConversations");

module.exports = getUserConversationsRoute = {
  method: "get",
  path: "/users/:id/conversations",
  handler: async (req, res) => {
    try {
      const { id: userId } = req.params;
      const conversations = await getUserConversations(userId);
      res.status(200).json(conversations);
    } catch (err) {
      console.log("getUserConversationsRoute " + err.message);
      return res.status(404).send([
        {
          id: "null",
          name: "Users are only allowed to access conversations",
        },
      ]);
    }
  },
};
