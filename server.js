const express = require('express'); 
const app = express();

app.get('/somedata', (request, response) => {
    response.send('here is your information');
});

app.listen(3000, ()=>{
    console.log("I am listening");
});