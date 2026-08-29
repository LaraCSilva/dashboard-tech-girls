import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import UploadPage from "./pages/UploadPage";
import DashboardPage from "./pages/DashboardPage";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-frame">
          <NavBar />
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
