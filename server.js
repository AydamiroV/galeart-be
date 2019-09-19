const express = require('express');
const app = express();
const PORT = 4200;
const path = require('path');

const contactService = require('./services/ContactService');

app.use(express.urlencoded({extended: false}));
app.use(express.json());




/**
*   Save the message from the user to DB
*   and notify the Admin
*/
app.post('/contact', (req, res) => {
	console.log('Data: ', req.body);

    const params = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };

    contactService.saveMessageAndNotify(params, (error, success) => {
        if (error) {
            res.status(error.code).json(error.msg);
        } else {
            res.json(success);
        }
    })
});

app.post('/placeOrder', function(req, res) {
	console.log(req.body);
});

//app.get('/', (req, res) => {
//    console.log('Data: ');
//	res.sendFile(path.join(__dirname, 'contact.html'));
//});

app.listen(PORT, () => console.log('Server starts on PORT, ', PORT));