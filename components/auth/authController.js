const db = require('../../config/database/connection');
const { compare } = require('bcrypt');
const { generateRandomString } = require('../../lib/misc');
const { issueNewToken } = require('../../lib/jwtHelper');

const authentication = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.query(
            'SELECT * FROM users where username = ?',
            [username]
        )
        if (!user[0]) return res.json({ status: 'failed', message: 'User is not found'});
        const { password : hashedPassword } = user[0];
        const isValid = password.trim() === hashedPassword;
        
        if(!isValid) return res.json({status: 'failed', message: 'Not succeed, invalid username or password'})
        // instead of jwt add generateRandomString(32)
        const acc_token = await issueNewToken({id : user[0].id, username});

        res.setHeader('X-token', acc_token);
        
        let [nonRefundedDeposits, games, purchaseAmount]= await Promise.all(
            [
            db.query(
            'SELECT SUM(amount) as dep_amount FROM deposits WHERE isRefunded = ? AND user_id = ?',
            [false, user[0].id]
            ),
            db.query(
                'SELECT game_id FROM purchases WHERE user_id = ?', 
                [user[0].id]
            ),
            db.query(
                'SELECT SUM(amount) as purchase_amount FROM purchases WHERE user_id = ?', 
                [user[0].id]
            )

        ]
        )
        nonRefundedDeposits = !nonRefundedDeposits[0]['dep_amount'] ? 0 : nonRefundedDeposits[0]['dep_amount'];
        purchaseAmount = !purchaseAmount[0]['purchase_amount'] ? 0 : purchaseAmount[0]['purchase_amount'];
        let totalBalance = nonRefundedDeposits - purchaseAmount;
        // 10 eur in cents = 1000, eur * 100 = cents
        // did not understand when to convert it
        return res.json({
            token: acc_token,
            balance: totalBalance,
            status: 'ok',
            message: 'Successful',
            games: games.map(game => game.game_id),
        })
    
    } catch (err) {
        return res.json({ 
            status: 'failed', 
            message: 'Unknown error'
        });
    }
};

module.exports = {
    authentication
};