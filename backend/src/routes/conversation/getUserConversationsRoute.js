const getUserConversations = require("../../db/conversation/getUserConversations");
const jwt = require("jsonwebtoken");

module.exports = getUserConversationsRoute = {
  method: "get",
  path: "/users/:id/conversations",
  handler: async (req, res) => {
    try {
      const { id: userId } = req.params;

      const decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET_KEY
      );

      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decoded.authenticated && currentTimestamp <= decoded.exp) {
        const conversations = await getUserConversations(userId);
        res.status(200).json(conversations);
      } else {
        return res.status(403).json([
          {
            id: "null",
            name: "Users are only allowed to access conversations",
          },
        ]);
      }
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
