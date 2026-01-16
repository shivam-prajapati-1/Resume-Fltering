import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Skill from "./components/Skill";
import Resume from "./components/Resume";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import JobPost from "./components/JobPost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/category" element={
          <PrivateRoute><Category /></PrivateRoute>
        } />

        <Route path="/skill" element={
          <PrivateRoute><Skill /></PrivateRoute>
        } />

        <Route path="/resume" element={
          <PrivateRoute><Resume /></PrivateRoute>
        } />

        <Route path="/jobpost" element={
          <PrivateRoute><JobPost /></PrivateRoute>
        } />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
