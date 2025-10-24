import React from 'react'
import { Link } from 'react-router-dom'
export default function Header(){
return (
<header className="header">
<div className="container header-inner">
<h1>Cadastro de Pessoas</h1>
<nav>
<Link to="/">Lista</Link>
<Link to="/new" className="btn-primary">Novo</Link>
</nav>
</div>
</header>
)
}