const getCanUserAccessConversation = require("../../db/conversation/getCanUserAccessConversation");
const addMessageToConversation = require("../../db/conversation/addMessageToConversation");
const getConversation = require("../../db/conversation/getConversation");

module.exports = addMessageToConversationRoutes = {
  method: "post",
  path: "/addconversations/:conversationId/:userId",
  handler: async (req, res) => {
    try {
      const { userId, conversationId } = req.params;
      const userIsAuthorized = await getCanUserAccessConversation(
        userId,
        conversationId
      );
      const { text, messageHistory } = req.body;

      var id = "";
      var message = text.text;
      if (text.isUser == "false") id = process.env.CHATBOT_ID;
      else id = userId;
      const isimage = text.isimage;

      if (userIsAuthorized) {
        await addMessageToConversation(
          message,
          id,
          conversationId,
          isimage,
          messageHistory
        );
        const updatedConversation = await getConversation(conversationId);
        res.status(200).json({
          conversation: updatedConversation.populatedConversation,
          messageHistory: updatedConversation.messageHistory,
        });
      } else {
        res.status(400).json({
          error: "You are not Authorized!",
          conversation: [],
          messageHistory: "",
        });
      }
    } catch (err) {
      console.log("addMessageToConversationRoutes " + err.message);
      return res.status(400).send({
        error: "Server Error!",
        conversation: [],
        messageHistory: "",
      });
    }
  },
};
