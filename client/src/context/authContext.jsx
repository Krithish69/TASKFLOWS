import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

// 1. Context Declaration
const AuthContext = createContext(null);
const API_URL = "http://localhost:5000/api/users";

// 2. Provider Logic
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper for Session Management
  const setSession = useCallback((userData, token) => {
    if (userData && token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  // Sync Auth State on Page Load
  useEffect(() => {
    const initialize = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser && savedUser !== "undefined") {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          setSession(null, null);
        }
      }
      setLoading(false);
    };
    initialize();
  }, [setSession]);

  // Auth Actions
  const register = async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, userData);
      setSession(data.user, data.token);
      return data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, credentials);
      setSession(data.user, data.token);
      return data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  };

  const logout = useCallback(() => setSession(null, null), [setSession]);

  // Provider Value Memoization
  const contextValue = useMemo(
    () => ({
      user,
      loading,
      register,
      login,
      logout,
    }),
    [user, loading, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading ? (
        children
      ) : (
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// 3. Exports at the Last
export { AuthContext, AuthProvider };
