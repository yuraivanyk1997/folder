
const app = require("express")();
const parser = require("body-parser").json({ extended: true });
const userRouter = require("./user");
const listRouter = require("./list");



app.listen(8080, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server started");
  }
});
app.use("/", userRouter);
app.use("/list",listRouter);
