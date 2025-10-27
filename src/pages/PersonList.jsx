import { useEffect, useState, useCallback  } from "react";
import api from "../services/api";
import PersonCard from "../components/PersonCard";

export default function PersonList() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

 const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/pessoa", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPeople(res.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }, [token]); // token é dependência, pois é usado dentro da função

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id) {
    if (!window.confirm("Confirmar exclusão?")) return;
    try {
      await api.delete(`/pessoa/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPeople((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Erro ao excluir");
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Registros</h2>
      </div>

      {loading && <p className="status-text">Carregando...</p>}
      {error && <p className="status-text" style={{ color: "#e53935" }}>{error}</p>}
      {!loading && people.length === 0 && (
        <p className="status-text">Sem registros.</p>
      )}

      <div className="grid">
        {people.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onDelete={() => handleDelete(person.id)}
          />
        ))}
      </div>
    </div>
  );
}
