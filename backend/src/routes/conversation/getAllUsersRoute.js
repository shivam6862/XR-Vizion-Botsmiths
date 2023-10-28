const getAllUsers = require("../../db/conversation/getAllUsers");

module.exports = getAllUsersRoute = {
  method: "get",
  path: "/users",
  handler: async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.log("get All UsersRoute file error:" + err.message);
      return res.status(400).send({
        error: "Server Error!",
        users: [],
      });
    }
  },
};
