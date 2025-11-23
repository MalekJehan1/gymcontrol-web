import { useState } from "react";

export default function RegisterForm({ onSubmit, loading, erro }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function formatarNome(nome) {
    return nome
      .toLowerCase()
      .split(" ")
      .filter((p) => p.trim() !== "")
      .map((p) => p[0].toUpperCase() + p.substring(1))
      .join(" ");
  }

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      nome: formatarNome(nome),
      sobrenome: formatarNome(sobrenome),
      email,
      senha,
    });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      {/* Erro */}
      {erro && (
        <div className="bg-red-600 text-white px-4 py-2 rounded-md text-center font-medium">
          {erro}
        </div>
      )}

      {/* Nome */}
      <div className="flex flex-col items-start">
        <label className="mb-1 text-gray-200 font-medium text-left">
          Nome:
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white
                 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col items-start">
        <label className="mb-1 text-gray-200 font-medium text-left">
          Sobrenome:
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white
                 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col items-start">
        <label className="mb-1 text-gray-200 font-medium text-left">
          Email:
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white
                 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Senha */}
      <div className="flex flex-col items-start">
        <label className="mb-1 text-gray-200 font-medium text-left">
          Senha:
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white
                 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="mt-2 px-6 py-2 rounded-2xl bg-white text-black font-semibold shadow-lg
               hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}
