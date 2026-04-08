import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import type { SafeUser } from "./interfaces/User";

type View = "login" | "dashboard";

function App() {
  const [view, setView] = useState<View>("login");
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

  const handleLoginSuccess = (user: SafeUser) => {
    setCurrentUser(user);
    setView("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("login");
  };

  return (
    <>
      {view === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
      {view === "dashboard" && currentUser && (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;