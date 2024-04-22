const Mongoose = require("mongoose");

const ConnectDb = async () => {
  try {
    const connect = await Mongoose.connect(process.env.MONGODB_URI);

    console.log(`Database connected @${connect.connection.host}`);
  } catch (error) {
    console.log("Connection Error ConnectDb()", error);
  }
};

module.exports = ConnectDb;
