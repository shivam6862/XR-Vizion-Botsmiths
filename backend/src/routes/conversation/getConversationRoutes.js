const getCanUserAccessConversation = require("../../db/conversation/getCanUserAccessConversation");
const getConversation = require("../../db/conversation/getConversation");
const jwt = require("jsonwebtoken");

module.exports = getConversationRoutes = {
  method: "get",
  path: "/getconversations/:conversationId/:userId",
  handler: async (req, res) => {
    try {
      const { conversationId, userId } = req.params;

      const userIsAuthorized = await getCanUserAccessConversation(
        userId,
        conversationId
      );

      if (userIsAuthorized == "Data not Found") {
        return res.status(404).json({
          conversation: [
            {
              text: userIsAuthorized,
              isimage: "false",
              postedById: process.env.CHATBOT_ID,
              isUser: "false",
            },
          ],
        });
      }
      const decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET_KEY
      );

      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (
        !userIsAuthorized ||
        !decoded.authenticated ||
        currentTimestamp > decoded.exp
      ) {
        return res.status(403).json({
          conversation: [
            {
              text: "You are not Authorized!",
              isimage: "false",
              postedById: process.env.CHATBOT_ID,
              isUser: "false",
            },
          ],
        });
      }

      const response = await getConversation(conversationId);

      res.status(200).json({
        conversation: response.populatedConversation,
        messageHistory: response.messageHistory,
      });
    } catch (err) {
      console.log("getConversationRoutes " + err.message);
      return res.status(400).send({
        error: "Server Error!",
        conversation: [],
      });
    }
  },
};
