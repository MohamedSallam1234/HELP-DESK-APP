const express = require('express');
const connectDB = require('./config/db');
const notificationRoute = require('./routes/notification');

const app = express();
app.use(express.json());

app.use('/sendEmail', notificationRoute);

// Connect Database
connectDB().then(() => console.log('Database Connected'));
const port = process.env.PORT || 5000;

app.listen(port,()=>{
   console.log(`Server running on port ${port}`);
});

