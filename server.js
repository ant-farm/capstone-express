require('dotenv').config()


const express = require('express'); 
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = process.env.PORT
const cors = require('cors')
const app = express();

require('./db/db.js')
//middleware----
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use(cors())


app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
}))

//controllers ------

const userController = require('./controllers/usersController.js')
app.use('/users', userController)

const buildingController = require('./controllers/buildingsController.js')
app.use('/building', buildingController)

const postsController = require('./controllers/postsController.js')
app.use('/posts', postsController)

const commentsController = require('./controllers/commentsController.js')
app.use('/comments', commentsController)

console.log('none of the controllers worked')

//homepage ----

// app.use('/', (req, res) => {
// 	res.render('index.ejs')
// })

app.listen(5000, ()=>{
    console.log("I am listening");
});