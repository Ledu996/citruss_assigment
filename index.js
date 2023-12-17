const express = require('express');
const app = express();
const db = require('./config/database/connection');
const userRoutes = require('./components/user/userRouter');
const depositRoutes = require('./components/deposit/depositRouter');
const refundRoutes = require('./components/refund/refundRouter');
const gamesRoutes = require('./components/game/gameRouter');
const authRoutes = require('./components/auth/authRouter');



app.use(express.json());

// application routes
app.use('', userRoutes);
app.use('', depositRoutes);
app.use('', refundRoutes);
app.use('/game', gamesRoutes);
app.use('/', authRoutes);

app.listen(5000, () => console.log('listening on port 5000'));


