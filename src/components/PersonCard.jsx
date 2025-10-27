import { Link } from "react-router-dom";

export default function PersonCard({ person, onDelete }) {
  return (
    <div className="person-card">
      <h3 className="person-name">{person.nome}</h3>

      <p className="person-field">
        <strong>CPF:</strong> {person.cpf}
      </p>
      <p className="person-field">
        <strong>E-mail:</strong> {person.email || "—"}
      </p>
      <p className="person-field">
        <strong>Data Nasc:</strong>{" "}
        {person.dataNascimento
          ? new Date(person.dataNascimento).toLocaleDateString()
          : "—"}
      </p>

      <div className="person-actions">
        <Link to={`/pessoa/${person.id}`} className="btn btn-edit">
          Editar
        </Link>
        <button onClick={onDelete} className="btn btn-delete">
          Remover
        </button>
      </div>
    </div>
  );
}
