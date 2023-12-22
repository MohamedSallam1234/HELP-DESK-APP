import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import OtpPage from "./pages/auth/otp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/auth/otp"} element={<OtpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
