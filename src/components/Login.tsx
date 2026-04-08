import { useState } from "react";
import type { FormEvent } from "react";
import { authenticate } from "../utils/auth";
import type { SafeUser } from "../interfaces/User";

interface LoginProps {
    onLoginSuccess: (user: SafeUser) => void;
}

function Login({ onLoginSuccess }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
 
    const result = authenticate({ email, password });
 
    if (result.success && result.user) {
      onLoginSuccess(result.user);
    } else {
      setError(result.message);
    }
 
    setLoading(false);
  };
 
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="login-badge">AUTH</div>
          <h1 className="login-title">Sign In</h1>
          <p className="login-subtitle">Enter your credentials to continue</p>
        </div>
 
        <form onSubmit={handleSubmit} className="login-form">
          <div className="field-group">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@example.com"
              autoComplete="email"
              required
            />
          </div>
 
          <div className="field-group">
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
 
          {error && (
            <div className="error-box" role="alert">
              {error}
            </div>
          )}
 
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
 
        <p className="login-hint">
          Demo credentials: <code>alice@example.com</code> /{" "}
          <code>alice123</code>
        </p>
      </div>
    </div>
  );
}
 
export default Login;
 