import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//import OtpPage from "./pages/auth/otp";
import Login from "./pages/auth/login";
import Register from "./pages/register";
import KnowledgebasePage from "./pages/auth/knowledgebase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path={"/auth/knowledgebase"} element={<KnowledgebasePage />} />
        {/* <Route path={"/auth/otp/:email"} element={<OtpPage />} /> */}
        <Route path={"/login"} element={<Login/>} />
        <Route path={"/register"} element={<Register/>} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
