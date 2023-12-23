import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './pages/Login';
import TicketForm from './pages/Ticket';
import SendTicket from './pages/SendTicket';
import ViewTickets from './pages/ViewTickets';
import UpdateInfo from './pages/updateinfo';
import Agent from './pages/Agent';
import AgentTickets from './pages/agenttickets'

const App = () => {
  return (
    <Router>
      <div>
        {/* Your navigation, header, or layout components can go here */}

        
        {/* Define your routes */}
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/create-ticket" element={<TicketForm />} />
          <Route exact path="/send-ticket" element={<SendTicket />} />
          <Route exact path="/user-profile" element={<UpdateInfo />} />
          <Route exact path="/view-tickets" element={<ViewTickets />} />
          <Route exact path="/addautomatedsolution" element={<AgentTickets />}/>
          <Route exact path="/Agent" element={< Agent/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
