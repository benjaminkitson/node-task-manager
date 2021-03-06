const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticate = async (req, res, next) => {
  try {

    // const token = req.headers.cookie.replace('token=', '')
    // This seems to work as an alternative when trying to redirect with res.render - Leave commented for now, maybe revisit later.
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'heckinsecret')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

    if (!user) throw new Error()

    req.user = user
    req.token = token
    next()
  } catch {
    res.status(401).send({error: 'Please authenticate'})
  }
}


module.exports = authenticate
