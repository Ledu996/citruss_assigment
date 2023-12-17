const db = require('../../config/database/connection');
const { v4: uuidv4 } = require('uuid');
const { generateRandomString } = require('../../lib/misc');

const createGame = async (req, res) => {
    try {
        const { name, title, price } = req.body;

        const game_id = generateRandomString(32);
        await db.query(
            'INSERT INTO games (id, name, title, price) VALUES (?, ?, ?, ?)',
            [game_id, name, title, price]
        )

        return res.json({status: 'ok', message: 'success', game_id})

    } catch (err) {
        return res.json({status: 'failed', message: 'unknown error'});
    }
}


const buyGame = async (req, res) => {
    try {
        const { game_id, username } = req.body;
        let purchase_id = generateRandomString(32);
        let currentBalance = 0;

        const [user, game_price] = await Promise.all(
            [
                db.query(
                    'SELECT * FROM users where username = ?',
                    [username]
                ),
                db.query(
                    'SELECT price FROM games where id = ?',
                    [game_id]
                ),
            ]
        )

        if (!game_price.length) return res.json({status: 'failed', message: 'Unknown game'});

        
        const [purchaseAmount, nonRefundedDeposits] = await Promise.all(
            [
              db.query(
                'SELECT SUM(amount) as total_amount FROM purchases WHERE user_id = ?',
                [user[0].id]
            ),
            db.query(
                'SELECT SUM(amount) as deposit_balance from deposits WHERE user_id = ? AND isRefunded = ?',
                [user[0].id, false]
            )
            ],
        );        
        
        currentBalance = nonRefundedDeposits[0]['deposit_balance']- purchaseAmount[0]['total_amount'];
        
        if(currentBalance - game_price[0].price < 0) return res.json({status: 'failed', message: 'insufficient_funds'})
        
        await db.query(
            'INSERT INTO purchases (id, user_id, game_id, amount) VALUES (?, ?, ?, ?)',
            [purchase_id, user[0].id, game_id, game_price[0].price]
        );

           
        return res.json({
            status: 'ok', 
            message: 'success',
            balance: currentBalance - game_price[0].price, 
            game_id
        });

    } catch (err) {
        return res.json({status: 'failed', message: 'Unknown error' });
    }
}

module.exports = {
    createGame,
    buyGame,
}

