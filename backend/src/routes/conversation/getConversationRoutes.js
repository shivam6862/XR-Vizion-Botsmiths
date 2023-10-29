const getCanUserAccessConversation = require("../../db/conversation/getCanUserAccessConversation");
const getConversation = require("../../db/conversation/getConversation");

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
      if (userIsAuthorized == "conversation_null") {
        return res.status(404).json({
          conversation: [
            {
              text: "Data not Found",
              isimage: "false",
              postedById: process.env.CHATBOT_ID,
              isUser: "false",
            },
          ],
        });
      }
      if (userIsAuthorized == false) {
        return res.status(404).json({
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
