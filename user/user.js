const router = require("express").Router();
const parser = require("body-parser").json({ extended: true });
const sha512 = require("js-sha512").sha512;
const user = require("./user.model");
const middle = require("../middleWare");


router.get("/", function(req, res, next) {
  res.send({ data: "sign-in, sign-up, list" });
});





router.post("/sign-up", parser, middle.checkSign, function(req, res) {
  req.body.password = sha512(req.body.password);
  console.log(req.body);
  user
    .findOne({ name : req.body.name, password : req.body.password } )
    .then(doc => {
      if (doc === null) {
        user
          .create({ name : req.body.name, password : req.body.password } )
          .then(doc =>
            res.send({
              message: "Registered successfully",
              token: middle.createToken(doc)
            })
          );
      } else {
        res.send(`Change name or password`);
      }
    })
    .catch(err => console.log(`error ${err}`));
});

router.post("/sign-in", parser, middle.checkSign, function(req, res) {
  console.log(req.body);
  req.body.password = sha512(req.body.password);
  user
    .findOne({ name : req.body.name, password : req.body.password } )
    .then(doc => {
      if (doc === null) {
        res.send("Enter correct");
      } else {
        res.send({
          message: "You are wellcome",
          token: middle.createToken(doc)
        });
      }
    })
    .catch(err => res.send({ error: err }));
});

module.exports = router;
