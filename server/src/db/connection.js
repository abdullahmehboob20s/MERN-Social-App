let mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost:127.0.0.1/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected Successfully"))
  .catch(() => console.log("Connection Failed"));
