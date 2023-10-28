const deleteUserChat = require("../../db/conversation/deleteUserChat");
const getCanUserAccessConversation = require("../../db/conversation/getCanUserAccessConversation");

module.exports = deleteUserChatRoutes = {
  method: "delete",
  path: "/deletechat/:conversationId/:userId",
  handler: async (req, res) => {
    try {
      const { userId, conversationId } = req.params;
      const userIsAuthorized = await getCanUserAccessConversation(
        userId,
        conversationId
      );

      if (userIsAuthorized) {
        const response = await deleteUserChat(conversationId);
        res.status(200).json({
          message: response,
        });
      } else {
        res.status(400).json({
          error: "You are not Authorized!",
          message: "Error!",
        });
      }
    } catch (err) {
      console.log("deleteUserChatRoutes " + err.message);
      return res.status(400).send({
        error: "Server Error!",
        message: "Error!",
      });
    }
  },
};
