require("dotenv").config();

const app = require("./src/app");
const sequelize = require("./src/config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.sync();

    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();