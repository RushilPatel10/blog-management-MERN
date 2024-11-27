const dotenv = require("dotenv");
dotenv.config();
const { MONGO_URL, PORT } = process.env;
const Config = { MONGO_URL, PORT };
module.exports = Config;