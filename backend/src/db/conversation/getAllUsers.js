const getDb = require("../db").getDb;

module.exports = getAllUsers = async () => {
  try {
    const connection = await getDb();
    const users = await connection.collection("users").find({}).toArray();
    const filteredUsers = users.map((user) => {
      return {
        email: user.email,
        name: user.name,
        id: user.id,
      };
    });
    return filteredUsers;
  } catch (err) {
    console.log("get AllUsers file error:" + err.message);
    throw err;
  }
};
