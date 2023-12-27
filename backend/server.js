const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth')
const user = require("./routes/user")
const administrator = require("./routes/administrator")
const manager = require("./routes/manager")
const agent = require("../backend/routes/agent")
const authenticationMiddleware = require("./middleware/authanticationMiddleware");
const cookieParser = require('cookie-parser');
const communication = require('./models/communication');
const notificationRoute = require('./routes/notification');

const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const http = require('http');
const cors = require('cors');
const{Server} = require('socket.io');
// const {exec} = require("child_process");

//const CryptoJS = require("crypto-js");
//const crypto = require('crypto');
//const algorithm = 'aes-256-cbc';
//const sjcl = require('sjcl');
//const { AES, enc } = require('@originjs/crypto-js-wasm');
//const nacl = require('tweetnacl');

//const key = Buffer.from('B374A26A71490437AA024E4FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF', 'hex');
//const iv = Buffer.from('7E892875A52C59A3B588306B13C31FBD', 'hex');

// const key = 'B374A26A71490437AA024E4FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF';
// const iv = '7E892875A52C59A3B588306B13C31FBD';
//
// const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
//
// function encrypt(data, key) {
//     const messageBytes = new TextEncoder().encode(data);
//     const encrypted = nacl.secretbox(messageBytes, nonce, key);
//     return { encrypredMsg: nacl.util.encodeBase64(encrypted), nonce: nonce};
// }



// function encrypt(text) {
//      let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//      let encrypted = cipher.update(text);
//      encrypted = Buffer.concat([encrypted, cipher.final()]);
//      return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

//
// const corsOptions = {
//     origin: 'localhost:5173',
//     methods: ['GET', 'POST'],
// };
//
//
// app.use(cors(corsOptions));

const options = {
    key: fs.readFileSync(path.resolve(__dirname,'./help-desk-app-privateKey.key')),
    cert: fs.readFileSync(path.resolve(__dirname,'./help-desk-app.crt'))
};


app.use(cors({
    origin: 'https://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const server = https.createServer(options,app);
const io = new Server(server, {
    cors: {
        origin: 'https://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
});

io.on('connection', (socket)=>{
    console.log(`User connected: ${socket.id}`);

    socket.on('join_room', (data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
        // Retrieve old messages from the database
        communication.find({ room: data})
            .then(messages => {
                // Send old messages to the client
                socket.emit('old_messages', messages);
            })
            .catch(err => console.error(err));
    });

    socket.on('send_message', (data)=>{
        // const encryptedMessage = encrypt(data.message, key, nonce);
        // data.message = encryptedMessage.ciphertext;
        // data.iv = encryptedMessage.iv;
        socket.to(data.room).emit('receive_message', data);

        let newMessage = new communication({
            sender:data.sender,
            receiver:data.receiver,
            message:data.message,
            room:data.room,
            data:new Date(data.room)
        });
        newMessage.save().then(()=>console.log('message saved')).catch(err=>console.log(err));
    });

    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id);
    });
});

// Connect Database
connectDB();
//app.use('/sendEmail', notificationRoute);

app.use("/api/v1",authRoutes);
app.use(authenticationMiddleware);
app.use("/api/v1",user);
app.use('/api/v1', administrator);
app.use('/api/v1',agent);
app.use('/api/v1',manager);

//app.use('/sendEmail', notificationRoute);

const port = process.env.PORT || 5000;

server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

app.get('/backup', (req, res) => {
    const mongoURI = "mongodb+srv://ibrahimsallam100:mohamed@cluster0.vvarrcg.mongodb.net/HELP-DESK-APPdb?retryWrites=true&w=majority";
    const backupDir = "C:\\Users\\mohamed\\Desktop\\backup";
    const dumpCommand = `mongodump --uri="${mongoURI}" --out=${backupDir}`;

    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing mongodump: ${error}`);
            return res.status(500).send('Error executing mongodump');
        }
        console.log(`mongodump stdout: ${stdout}`);
        console.error(`mongodump stderr: ${stderr}`);
        res.send('Backup completed successfully');
    });
});

app.get('/restore', (req, res) => {
    const mongoURI = "mongodb+srv://ibrahimsallam100:mohamed@cluster0.vvarrcg.mongodb.net/HELP-DESK-APPdb?retryWrites=true&w=majority";
    const backupDir = "C:\\Users\\mohamed\\Desktop\\backup";
    const restoreCommand = `mongorestore --uri="${mongoURI}" ${backupDir}`;

    exec(restoreCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing mongorestore: ${error}`);
            return res.status(500).send('Error executing mongorestore');
        }
        console.log(`mongorestore stdout: ${stdout}`);
        console.error(`mongorestore stderr: ${stderr}`);
        res.send('Restore completed successfully');
    });
});


