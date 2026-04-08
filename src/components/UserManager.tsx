import { useState, useEffect } from "react";
import { UserStore } from "../utils/UserStore";
import type { User } from "../interfaces/User";

const store = new UserStore();

interface LogEntry {
  id: number;
  text: string;
}

function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<User | null | undefined>(
    undefined
  );

  const addLog = (text: string) => {
    setLogs((prev) => [{ id: Date.now(), text }, ...prev].slice(0, 10));
  };

  const patchConsole = () => {
    const original = console.log;
    console.log = (...args: unknown[]) => {
      original(...args);
      addLog(args.map(String).join(" "));
    };
    return () => {
      console.log = original;
    };
  };

  useEffect(() => {
    const restore = patchConsole();
    const initial = store.list();
    setUsers(initial);
    return restore;
  }, []);

  const refresh = () => setUsers(store.list());

  const handleCreate = () => {
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) return;
    store.create({ name: newName.trim(), email: newEmail.trim(), password: newPassword.trim() });
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    refresh();
  };

  const handleUpdate = (id: number) => {
    if (!editName.trim()) return;
    store.update(id, { name: editName.trim() });
    setEditingId(null);
    setEditName("");
    refresh();
  };

  const handleRemove = (id: number) => {
    store.remove(id);
    refresh();
  };

  const handleSearch = () => {
    const result = store.findByName(searchTerm.trim());
    setSearchResult(result ?? null);
  };

  return (
    <div className="manager-grid">
      <section className="panel">
        <h2 className="panel-title">Users</h2>

        <div className="search-row">
          <input
            className="field-input"
            placeholder="Search by name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-secondary" onClick={handleSearch}>
            Find
          </button>
        </div>

        {searchResult !== undefined && (
          <div className="search-result">
            {searchResult ? (
              <span>
                Found: <strong>{searchResult.name}</strong> —{" "}
                <code>{searchResult.email}</code>
              </span>
            ) : (
              <span className="text-muted">No user found.</span>
            )}
          </div>
        )}

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  {editingId === u.id ? (
                    <input
                      className="field-input inline-input"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleUpdate(u.id)}
                      autoFocus
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td>
                  <code>{u.email}</code>
                </td>
                <td>
                  <span className={`role-tag role-${u.role}`}>{u.role}</span>
                </td>
                <td className="action-cell">
                  {editingId === u.id ? (
                    <>
                      <button
                        className="btn-action btn-save"
                        onClick={() => handleUpdate(u.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn-action btn-cancel"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn-action btn-edit"
                        onClick={() => {
                          setEditingId(u.id);
                          setEditName(u.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleRemove(u.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="side-panels">
        <section className="panel">
          <h2 className="panel-title">Create User</h2>
          <p className="panel-note">
            The <code>@withUserDefaults</code> decorator automatically adds{" "}
            <code>role</code> and <code>createdAt</code>.
          </p>
          <div className="create-form">
            <input
              className="field-input"
              placeholder="Full name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              className="field-input"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              className="field-input"
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="submit-btn" onClick={handleCreate}>
              Create User
            </button>
          </div>
        </section>

        <section className="panel log-panel">
          <h2 className="panel-title">HTTP Simulation Log</h2>
          <div className="log-list">
            {logs.length === 0 ? (
              <p className="text-muted">No operations yet.</p>
            ) : (
              logs.map((entry) => (
                <div key={entry.id} className="log-entry">
                  <span className={getMethodClass(entry.text)}>
                    {getMethod(entry.text)}
                  </span>
                  <span className="log-text">{entry.text}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function getMethod(text: string): string {
  const match = text.match(/\[(GET|POST|PATCH|DELETE)\]/);
  return match ? match[1] : "LOG";
}

function getMethodClass(text: string): string {
  const method = getMethod(text);
  const map: Record<string, string> = {
    GET: "method-get",
    POST: "method-post",
    PATCH: "method-patch",
    DELETE: "method-delete",
    LOG: "method-log",
  };
  return `method-badge ${map[method] ?? "method-log"}`;
}

export default UserManager;