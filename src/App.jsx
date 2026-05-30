import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Viewer from "./pages/Viewer";
import PublicGallery from "./pages/PublicGallery";
import Header from "./components/Header";
import PublicViewer from "./pages/PublicViewer";

import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>

        {/* Public Routes */}
        
        <Route path="/" element={<PublicGallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/public-viewer/:id"
            element={<PublicViewer />}
          />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewer/:id"
          element={
            <ProtectedRoute>
              <Viewer />
            </ProtectedRoute>
          }
        />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;