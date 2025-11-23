import { useState } from "react";

export default function RegisterForm({ onSubmit, loading, erro }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ nome, email, senha });
  };

  return (
    <form onSubmit={submit}>
      {erro && <div className="alert alert-danger">{erro}</div>}

      {/* Nome */}
      <div className="mb-3">
        <label className="form-label">Nome:</label>
        <input
          type="text"
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Senha */}
      <div className="mb-3">
        <label className="form-label">Senha:</label>
        <input
          type="password"
          className="form-control"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-success w-100" disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}
