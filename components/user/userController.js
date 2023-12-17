const db = require('../../config/database/connection');
// const { v4: uuidv4 } = require('uuid');
const { generateRandomString } = require('../../lib/misc');

const register = async (req, res) => {
    try {

        const { username, password } = req.body;
        let id = generateRandomString(32);

        const user = await db.query(
            `SELECT * FROM users WHERE username = '${username}'`,
        )
        if(user.length) {
            return res.json({status: "Failed", message: "User already created"})
        }

        await db.query(
            `INSERT INTO users (id, username, password) VALUES('${id}','${username}', '${password}')`,
            [[username.trim(), password.trim()]]
        );
        
        return res.json({status: "success", message: "Successfully"})
    } catch (err) {
        console.log(err);
        return res.json({status: "failed", message: "Not succeeded, unknown error"});
    }
};

module.exports = {
    register,
};

