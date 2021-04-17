module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).json({"msg": 'You Need a minimum of 5 credits to send a survey'});
  }

  next();
};


// module.exports = (req, res, next) => {
//   if (req.user.credits < 1) {
//     return res.status(403).send({ error: "Not enough credits!" });
//   }

//   next();
// };

