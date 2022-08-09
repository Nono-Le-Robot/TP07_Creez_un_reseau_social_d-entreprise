const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const express = require('express')
const helmet = require('helmet')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
require('./config/db')
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const app = express()
const cors = require('cors')
const path = require('path')

// app.use(helmet())

app.use(cors())



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())


//jwt
app.get('*', checkUser);
app.get('/jwtid/:id', requireAuth)

//routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))


//server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});

