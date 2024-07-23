require('dotenv').config();

const express             = require('express');
const mongoose            = require('mongoose');
const { router }          = require('./routes/router');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {

    console.log('Successfully Connected to MongoDB');

})
.catch(error => {

    console.log(`Error while connecting to MongoDB: ${error}`);

});

// API Routes
app.use('/api', router);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));