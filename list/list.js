const router = require("express").Router();
const parser = require("body-parser").json({ extended: true });
const sha512 = require("js-sha512").sha512;
const list = require("./list.model");
const middle = require("../middleWare");

router.use(middle.checkToken, parser);
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromHeader("authorization"),
      secretOrKey: "secret"
    },
    function(jwtPayload, done) {
      list
        .findOne({ userId: jwtPayload.obj._id })
        .then(doc => {
          if (doc) {
            return done(null, doc);
          } else {
            return done(null, false);
          }
        })
        .catch(err => {
          return done(err, false);
        });
    }
  )
);

router.get("/", function(req, res) {
  list
    .find({})
    .then(doc => res.send({ message: "Our list", data: doc }))
    .catch(err => res.send(err));
});

router.post("/", function(req, res) {
  list
    .create({ userId: req.userId, content: req.body.content})
    .then(doc => res.send({ message: "Yo add new item", data: doc }))
    .catch(err => res.send(err));
});

router.delete("/:id", function(req, res) {
  list
    .findByIdAndDelete(req.params.id)
    .then(doc => res.send({ message: `Deleted successfully`, data: doc }))
    .catch(err => res.send(err));
});

router.put("/:id", middle.checkContent, passport.authenticate("jwt"), function(
  req,
  res
) {
  res.send(req.user);
  /*list
    .findByIdAndUpdate(req.params.id,{ content : req.body.content }, { new: true })
    .then(doc => res.send({ message: "Updated item", data: doc }))
    .catch(err => res.send(err));*/
});

module.exports = router;

//const passport = require('passport');
//const LocalStrategy = require('passport-local');
//const Users = mongoose.model('Users');

/*passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));*/
