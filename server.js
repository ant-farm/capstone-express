require('dotenv').config()


const express = require('express'); 
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = process.env.PORT

const app = express();

require('./db/db.js')
app.use(bodyParser.json())
//middleware----
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
	extended: false
}))


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

console.log('none of the controllers worked')

//homepage ----

// app.use('/', (req, res) => {
// 	res.render('index.ejs')
// })

app.listen(5000, ()=>{
    console.log("I am listening");
});