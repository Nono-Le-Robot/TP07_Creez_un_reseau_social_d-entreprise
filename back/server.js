require('dotenv').config({ path: './config/.env' })
require('./config/db')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const express = require('express')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

//jwt
app.get('*', checkUser);

//routes
app.use('/portfolio/groupomania/api/user', userRoutes)
app.use('/portfolio/groupomania/api/post', postRoutes)
app.use('/portfolio/groupomania/images', express.static(path.join(__dirname, 'images')))

//server
app.listen(5000, () => {
    console.log(`listening on port 5000`);
});