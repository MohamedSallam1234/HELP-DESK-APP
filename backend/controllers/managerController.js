// const ticketModel = require("../../../../Downloads/HELP-DESK-APP-Minaehab (1)/HELP-DESK-APP-Minaehab/backend/models/ticketModel")
// const Report = require("../../../../Downloads/HELP-DESK-APP-Minaehab (1)/HELP-DESK-APP-Minaehab/backend/models/reportModel")

const ticketModel = require("../models/ticketModel");
const Report = require("../models/reportModel");

module.exports.generate_report = async (req, res) => {
    const { id } = req.params; // ticket id
    try {
      const ticket = await ticketModel.findOne({_id:id})
      var resolutionTime = "pending"
      var agentPerformance = "No agent rating available";
      if (ticket.status === "closed") {
        if(!ticket.ticket_rating){
        const timeDifference = (ticket.closedAt - ticket.openAt) / (1000 * 60); // Convert milliseconds to minutes
        resolutionTime = `${timeDifference.toFixed(2)} minutes`;
        agentPerformance = ticket.ticket_rating ? ticket.ticket_rating.toString() : "No agent rating available";
        }else{
          const timeDifference = (ticket.closedAt - ticket.openAt) / (1000 * 60); // Convert milliseconds to minutes
          resolutionTime = `${timeDifference.toFixed(2)} minutes`;
          agentPerformance = ticket.ticket_rating
        }
      } else if (ticket.status === "pending") {
        resolutionTime = "Pending";
      } else if (ticket.status === "open") {
        resolutionTime = "Open";
      }
      const report = await Report.create({
        ticket: ticket._id,
        ticket_status: ticket.status,
        agent_performance: agentPerformance,
        resolution_time: resolutionTime,
        message:ticket.mssg
      });

      res.status(201).json({ report, message: "Report Created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  module.exports.get_a_ticket_report = async (req, res) => {
    const { id } = req.params;
    try {
      const report = await Report.findOne({ ticket: id });

      res.status(200).json({ report });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
