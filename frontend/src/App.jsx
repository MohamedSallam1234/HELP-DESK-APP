import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import OtpPage from './components/auth/otp';
import Login from "./components/auth/login";
import Register from "./register";
import ChatHome from './components/chat/chatHome';
import EmailForm from './components/Email/Email';
import KnowledgeBase from "./components/knowledgeBase/knowledgeBase";
import Home from './pages/Home';
import Manger from './pages/mangerHomepage.jsx'
import TicketForm from './pages/Ticket';
import SendTicket from './pages/SendTicket';
import ViewTickets from './pages/ViewTickets';
import UpdateInfo from './pages/updateinfo';
import Agent from './pages/Agent';
import AgentTickets from './pages/agenttickets'
import CloseTicket from './pages/closeticket'
import LogOut from "./pages/logOut.jsx";
import MangerReport from "./pages/mangergetreport.jsx";
import CreateUsers from "./pages/CreateUsers";
import Admin from "./pages/Admin";
import AdminChangeRole from "./pages/AdminChangeRole";
import Analytics from "./pages/Analytics.jsx";
import Search from "./pages/Generatereports.jsx";
import TheReport from "./pages/thereport.jsx";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/auth/otp/:email"} element={<OtpPage />} />
                <Route path={"/"} element={<Login/>} />
                <Route path={"/register"} element={<Register/>} />
                <Route path={"/chathome"} element={<ChatHome />} />
                <Route path={"/email"} element={<EmailForm/>} />
                <Route path={"/knowledgebase"} element={<KnowledgeBase/>} />
                {/*<Route exact path="/" element={<LoginForm />} />*/}
                <Route exact path="/Home" element={<Home />} />
                <Route exact path="/create-ticket" element={<TicketForm />} />
                <Route exact path="/send-ticket" element={<SendTicket />} />
                <Route exact path="/user-profile" element={<UpdateInfo />} />
                <Route exact path="/view-tickets" element={<ViewTickets />} />
                <Route exact path="/addautomatedsolution" element={<AgentTickets />}/>
                <Route exact path="//close-ticket/:tid" element={<CloseTicket/>}/>
                <Route exact path="/Agent" element={< Agent/>} />
                <Route exact path="/AgentTickets" element={<AgentTickets />} />
                <Route path={"/logout"} element={<LogOut/>} />
                <Route path={"/createUsers"} element={<CreateUsers />} />
                <Route path={"/admin"} element={<Admin />} />
                <Route path={"/adminChangeRole"} element={<AdminChangeRole />} />
                <Route path={"/Analytics"} element={< Analytics/>} />
                <Route path={"/manger"} element={< Manger/>} />
                 <Route path={"/generatereports"} element={< Search/>} />
               <Route path={"/viewreports"} element={< MangerReport/>} />
               <Route path={"/view_report/:tid"} element={< TheReport/>} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
