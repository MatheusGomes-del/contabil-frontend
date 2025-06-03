import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import requestApiLogin from "../services/requestApiLogin";
import requestProfile from "../services/requestProfile";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await requestProfile(token);
        setUser(data.user);

        // Redireciona após obter perfil com sucesso
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/client");
        }

      } catch (err) {
        console.error("Token inválido ou expirado");
        setToken("");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await requestApiLogin(email, password);
      console.log(data)
      setToken(data.token);
  
      const profile = await requestProfile(data.token);
      setUser(profile.user);
  
      if (profile.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
  
    } catch (err) {
      console.error(err);
      alert("Falha no login: " + err.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
