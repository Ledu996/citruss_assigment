const db = require('../../config/database/connection');
const { v4: uuidv4 } = require('uuid');
const { generateRandomString } = require('../../lib/misc');

const createDeposit = async (req, res) => {
    try {
        
        const { username, amount } = req.body;
        const deposit_id = generateRandomString(32);
        let currentBalance = 0;
        
        const user = await db.query(
            'SELECT * FROM users WHERE username = ?', 
            [username]
        );  


        await db.query(
            'INSERT INTO deposits (id, user_id, amount) VALUES(?, ?, ?)', 
            [deposit_id, user[0].id, amount, 0]
        );

        let [nonRefundedDeposits, purchasesAmount] = await Promise.all(
            [
                db.query(
                    'SELECT SUM(amount) as dep_amount FROM deposits WHERE isRefunded = ? AND user_id = ?',
                    [false, user[0].id]
                ),
                db.query(
                    'SELECT SUM(amount) as tot_amount FROM purchases WHERE user_id = ?',
                    [user[0].id]
                )
            ]
        )
        nonRefundedDeposits = nonRefundedDeposits[0]['dep_amount'];
        purchasesAmount = !purchasesAmount[0]['tot_amount'] ? 0 : purchasesAmount[0]['tot_amount'];
        currentBalance = nonRefundedDeposits - purchasesAmount;

    return res.json({
            message: 'success', 
            status: 'ok',
            deposit_id: deposit_id,
            balance: currentBalance
        });

    } catch (err) {
        return res.json({message: 'Error', status: 'Error'})
    }
}


module.exports = {
    createDeposit
};



