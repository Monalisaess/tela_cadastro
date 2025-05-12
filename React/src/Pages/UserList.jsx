import { useState, useEffect } from "react";
import api from "../services/api";
import "./UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/cadastrados");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Erro ao carregar usuários: ${err.message}`);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-list">
      <h2>Usuários Cadastrados</h2>
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Idade: {user.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
