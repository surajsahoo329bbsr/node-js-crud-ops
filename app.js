require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./apis/users/user.router");

app.use(express.json());
app.use("/apis/users", userRouter);
app.listen(process.env.APP_PORT, () => {
    console.log("Server Up & Running On Port ", process.env.APP_PORT);
});