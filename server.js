require('dotenv').config();

const express             = require('express');
const mongoose            = require('mongoose');
const { router }          = require('./routes/router');
const bodyParser          = require('body-parser');
const path                = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {

    console.log('Successfully Connected to MongoDB');

})
.catch(error => {

    console.log(`Error while connecting to MongoDB: ${error}`);

});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api', router);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));