import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { username, password });
      console.log('response', response);
      console.log('username', username, password);
      const { token } = response.data;

      localStorage.setItem("token", token);
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div>
      <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
