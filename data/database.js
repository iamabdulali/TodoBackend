import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "API",
    })
    .then(() => {
      console.log("DATABASE IS CONNECTED");
    })
    .catch((e) => {
      console.log(e);
    });
};
