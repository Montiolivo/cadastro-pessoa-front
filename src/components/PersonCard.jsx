import React from 'react'
import { Link } from 'react-router-dom'
export default function PersonCard({person, onDelete}){
return (
<div className="card">
<h3>{person.nome}</h3>
<p><strong>CPF:</strong> {person.cpf}</p>
<p><strong>E-mail:</strong> {person.email || '—'}</p>
<p><strong>Data Nasc:</strong> {person.dataNascimento ? new Date(person.dataNascimento).toLocaleDateString() : '—'}</p>
<div className="card-actions">
<Link to={`/edit/${person.id}`} className="btn">Editar</Link>
<button onClick={onDelete} className="btn btn-danger">Remover</button>
</div>
</div>
)
}