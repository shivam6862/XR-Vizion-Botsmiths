const updateChatName = require("../../db/conversation/updateChatName");
const getCanUserAccessConversation = require("../../db/conversation/getCanUserAccessConversation");

module.exports = updateChatNameRoutes = {
  method: "put",
  path: "/updatechatname/:conversationId/:userId",
  handler: async (req, res) => {
    try {
      const { userId, conversationId } = req.params;
      const userIsAuthorized = await getCanUserAccessConversation(
        userId,
        conversationId
      );
      const { name } = req.body;

      if (userIsAuthorized) {
        const response = await updateChatName(conversationId, name);
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
      console.log("updateChatNameRoutes " + err.message);
      return res.status(400).send({
        error: "Server Error!",
        message: "Error!",
      });
    }
  },
};
