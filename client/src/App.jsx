import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

/**
 * ProtectedRoute Wrapper
 * Ensures that the 'user' exists in AuthContext (linked to LocalStorage/MongoDB)
 * before allowing access to private components.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // 1. Show a loader while checking LocalStorage on initial load
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. Redirect to Login if no user is found in the database session
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Render the private content if authenticated
  return children;
};

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Simple Navbar: Only visible when a user is logged in via MongoDB */}
        {user && (
          <nav className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
            <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Hello, {user.name}</span>
              <button 
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          </nav>
        )}

        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Private Route: Protected by MongoDB session check */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all: Redirect unknown paths to Home/Dashboard */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;