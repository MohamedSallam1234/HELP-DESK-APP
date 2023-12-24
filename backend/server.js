const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const user = require("./routes/user");
const administrator = require("./routes/administrator");
const agent = require("../backend/routes/agent");
const app = express();
const authenticationMiddleware = require("./middleware/authanticationMiddleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,

};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Connect Database
connectDB();
//test
app.use("/api/v1", authRoutes);
//app.use(authenticationMiddleware); uncomment later
app.use("/api/v1", user);
app.use("/api/v1", administrator);
app.use("/api/v1", agent);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

