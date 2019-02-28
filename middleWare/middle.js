const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator/check");

module.exports = {
  createToken: function(obj) {
    return jwt.sign({ obj }, "secret");
  },

  checkToken: function(req, res, next) {
    req.token = req.headers.authorization;
    if (typeof req.token !== "undefined") {
      console.log("jwt");
      console.log(jwt.verify(req.token, "secret"));
      jwt.verify(req.token, "secret", function(err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
          console.log({ data: data });
          req.userId = data.obj._id;

          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  },

  getToken : function(req, res, next){
    if(req.headers.authorization != "undefined"){
      req.body.userId = jwt.verify(req.headers.authorization, "secret").obj._id;
      next();
    };
    res.send({ err : "You are not initialized"});
  },




    /*passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'secret'
    },

    console.log("who")
    console.log(jwt.verify(req.headers.authorization, "secret"));
    next();
  },*/






  checkContent: [
    body("content").isLength({ min: 5 }),
    result
  ],
  checkSign: [
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
    result
  ]

};

function result (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}
