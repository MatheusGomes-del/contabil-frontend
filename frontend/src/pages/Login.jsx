import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import "../style/login.css";

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 /*  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/client"} />;
  }
 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      console.log("log do user", user)
      //navigate(user.role === "admin" ? "/admin" : "/client");

    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/client");
    }
  }, [user, navigate]);
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="login-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H3m0 0l4-4m-4 4l4 4m7 4v-1a3 3 0 00-3-3H9a3 3 0 00-3 3v1m7 0h4a2 2 0 002-2v-6a2 2 0 00-2-2h-4"
            />
          </svg>
          Acesso Seguro à Plataforma Contabil
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="********"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? "Validando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
