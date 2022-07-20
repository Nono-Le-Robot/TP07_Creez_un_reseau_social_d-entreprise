const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const express = require('express')
const userRoutes = require('./routes/user.routes')
require('dotenv').config({path: './config/.env'})
require('./config/db')
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth)

//routes
app.use('/api/user', userRoutes)


//server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});

