const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect databse
connectDB();

app.use(express.json({ extended: false}));

// Define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)) 