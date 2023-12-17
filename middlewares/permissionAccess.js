// extract the token from headers if it is valid go to next
// if now throw an error
const { verify } = require('jsonwebtoken')

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-token'];
        // await verify(token, 'secret');
        if (!token) throw new Error();
        next()
    } catch (err) {
        return res.json({message: 'err', message: 'Not authorized'})
    }
}


module.exports = {
    isAuthenticated,
}