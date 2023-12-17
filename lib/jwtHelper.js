const jwt = require('jsonwebtoken');

const issueNewToken = async (payload) => {
    const token = await jwt.sign(payload, 'secret', {expiresIn: '1h'});
    return token;
}

module.exports = {
    issueNewToken
}