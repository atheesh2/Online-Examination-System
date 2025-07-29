import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login'; // Only this import is needed
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import { Navigate } from 'react-router-dom';
import ExamPage from './components/ExamPage';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';


// Admin route with protection
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />; // Redirects to login page if no token found
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/exam" element={<ExamPage />} />
         
        {/* Admin Panel with protection */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
