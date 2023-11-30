const express = require('express');
const router = express.Router();
//const authentication = require('../middleware/authentication');
const {insertTicket,getTickets,getTicketById,updateClientReply,getUserById} = require('../models/ticket/Ticket.model');



router.all('/',(req,res,next)=>{
    //res.json({message:"Ticket Router"});

    next();
});

router.post('/',(req ,res)=> {
 // create a new ticket and save it to the database

    const {subject, sender, message, priority, subCategory, issueType} = req.body;

    const ticketObj = {
        clientId: "6563db2e81a99536172cd2ea",
        subject,
        priority,
        subCategory,
        issueType,
        informationAboutTicketUserToAgent : [
            {
                sender: "client",
                message,
            },
        ],
    };

    insertTicket(ticketObj)
        .then((data) => {
            res.json({message:"New ticket created",data});
        })
        .catch((error) => {
            console.log(error);
            res.json({status:"error",message:error.message});
        });
});


module.exports = router;