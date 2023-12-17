const db = require('../../config/database/connection');

const createRefund = async (req, res) => {
    try {
        const { deposit_id } = req.body;
        
        const deposit = await db.query(
            'SELECT * FROM deposits where id = ?',
            [deposit_id]
        )

        if (!deposit) return res.json({status: 'failed', message: 'unknown deposit'})
        
        await db.query(
            'UPDATE deposits SET isRefunded = ? WHERE id = ?',
            [true, deposit_id] 
        );
        let currentBalance = await db.query(
            'SELECT SUM(amount) as balance FROM deposits WHERE isRefunded != ? AND user_id = ?',
            [true, deposit[0].user_id]
        )
        currentBalance = !currentBalance[0].balance ? 0  : currentBalance[0].balance;

        res.json({
            balance: currentBalance,
            status: 'success', 
            message: 'success'
        });
    } catch (err) {
        return res.json({status: 'failed', message: 'unknown error'});
    }
}

module.exports = {
    createRefund,
}
    