import { connectDB } from "./data/database.js";
import { app } from "./app.js";

connectDB();

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

app.listen(process.env.PORT, () => {
  console.log(
    `server is working on ${process.env.PORT} in ${process.env.NODE_DEV} mode`
  );
});
