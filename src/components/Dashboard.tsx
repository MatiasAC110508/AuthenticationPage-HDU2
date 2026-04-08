import type { SafeUser } from "../interfaces/User";
import UserManager from "./UserManager";

interface DashboardProps {
  user: SafeUser;
  onLogout: () => void;
}

function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-brand">
          <span className="header-badge">SYSTEM</span>
          <span className="header-title">User Management</span>
        </div>
        <div className="header-user">
          <div className="user-pill">
            <span className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <span className="user-name">{user.name}</span>
            <span className={`role-tag role-${user.role}`}>{user.role}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <UserManager />
      </main>
    </div>
  );
}

export default Dashboard;