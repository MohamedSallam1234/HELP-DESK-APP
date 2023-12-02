const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth')
const user = require("./routes/user")
const administrator = require("./routes/administrator")
const app = express();
const authenticationMiddleware = require("./middleware/authanticationMiddleware");
const cors = require("cors");
const cookieParser = require('cookie-parser');





app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())





// Connect Database
connectDB();

app.use("/api/v1",authRoutes)
app.use(authenticationMiddleware);
app.use('/api/v1', user);
app.use('/api/v1', administrator);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
   console.log(`Server running on port ${port}`);
});

