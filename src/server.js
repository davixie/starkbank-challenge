const bootApp = require("./configs/AppConfig");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = require("./app");

bootApp().then(() => {
  const runServer = () => {
    const server = app.listen(PORT, () =>  console.log("conecting to PORT ", PORT));
  
    process.on("unhandledRejection", (err) => {
      console.log("ERROR: ", err);
      console.log("Shutting down server");
      server.close(() => process.exit(1));
    });
  
    process.on("SIGTERM", () => {
      server.close(() => console.log("Shutting down gracefully"));
    });
  }
  
  runServer();
});