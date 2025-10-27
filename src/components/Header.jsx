import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Cadastro de Pessoas</h1>
        <nav className="header-nav">
          <Link to="/" className="header-link">Lista</Link>
          <Link to="/pessoa" className="header-link header-new">Novo</Link>
          <button onClick={handleLogout} className="header-logout">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
