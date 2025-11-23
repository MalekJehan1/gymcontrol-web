import { useState } from "react";

export default function LoginForm({ onSubmit, loading, erro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ email, senha });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      {erro && (
        <div className="bg-red-600 text-white px-4 py-2 rounded-md text-center font-medium">
          {erro}
        </div>
      )}

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
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
