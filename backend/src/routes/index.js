const getUserConversationsRoute = require("./conversation/getUserConversationsRoute");
const getAllUsersRoute = require("./conversation/getAllUsersRoute");
const createConversationRoute = require("./conversation/createConversationRoute");
const addMessageToConversationRoutes = require("./conversation/addMessageToConversationRoutes");
const getConversationRoutes = require("./conversation/getConversationRoutes");
const updateChatNameRoutes = require("./conversation/updateChatNameRoutes");
const deleteUserChatRoutes = require("./conversation/deleteUserChatRoutes");

module.exports = routes = [
  getUserConversationsRoute,
  getAllUsersRoute,
  createConversationRoute,
  addMessageToConversationRoutes,
  getConversationRoutes,
  updateChatNameRoutes,
  deleteUserChatRoutes,
];
