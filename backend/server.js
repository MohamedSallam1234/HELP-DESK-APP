const express = require('express');
const connectDB = require('./config/db');
const ticketRouter = require('./routes/ticket.router');


// const User = require('./models/user/User.schema');
// const Ticket = require('./models/ticket/Ticket.schema');
// const Agent = require('./models/agent/Agent.schema');

const app = express();
app.use(express.json());

// Connect Database
connectDB().then(() => console.log('Database Connected'));
const port = process.env.PORT || 5000;

// use routers
app.use('/v1/ticket',ticketRouter);

// app.get('/',(req,res)=>{
//     User.findOne({_id:"6563db2e81a99536172cd2ea"}).then((doc)=>{
//         res.send(doc);
//     }).catch((err)=>{
//         res.send(err);
//     });
// });
//
// app.get('/ticket',(req,res)=>{
//     Ticket.find({}).then((doc)=>{
//         res.send(doc);
//     }).catch((err)=>{
//         res.send(err);
//     });
// });
//
// app.get('/agent',(req,res)=>{
//     Agent.find({}).then((doc)=>{
//         res.send(doc);
//     }).catch((err)=>{
//         res.send(err);
//     });
// });



app.listen(port,()=>{
   console.log(`Server running on port ${port}`);
});

