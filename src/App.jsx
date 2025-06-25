// import { useState } from 'react'
// import './App.css'
// import Navbar from './components/Navbar/NavBar'
// import Dashboard from './pages/Dashboard'

// function App() {
//   const [count, setCount] = useState(0)


//   return (
//     <div className="header">
//       <Navbar activeNavTab={(val)=>setCount(val)}/>
//         <Dashboard/>
//       <div className="blured-curcle-bg"/>
//     </div>
//   )
// }

// export default App

import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/NavBar';

import Login from "./pages/Login";
import Bots from "./pages/Bots";
import Paths from "./pages/Paths";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from './pages/dashboard';

function LayoutWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
    <div>
      {!hideNavbar && 
      <div className="header">
      <Navbar />
      </div>
      }
      <Routes>
        <Route path="/" element={<ProtectedRoute><Bots /></ProtectedRoute>} />
        <Route path="/robots" element={<ProtectedRoute><Bots /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/paths" element={<ProtectedRoute><Paths /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* <div className="blured-curcle-bg"/> */}
      </div>
    </>
    
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}
