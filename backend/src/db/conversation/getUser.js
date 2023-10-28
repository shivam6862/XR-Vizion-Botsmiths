const getDb = require("../db").getDb;

module.exports = getUser = async (userId) => {
  try {
    const connection = await getDb();
    const user = await connection.collection("users").findOne({ id: userId });
    return {
      email: user.email,
      name: user.name,
      id: user.id,
    };
  } catch (err) {
    console.log("getUser " + err.message);
    throw err;
  }
};
