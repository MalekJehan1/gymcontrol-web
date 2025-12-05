import { useState } from "react";
import Navbar from "../components/NavbarPrivada";
import WithAuth from "../auth/WithAuth";
import { getUsuario, gravaAutenticacao } from "../auth/Autenticacao";
import { atualizarMeuUsuarioAPI } from "../services/UserService";

function Perfil() {
  const usuario = getUsuario();

  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState(usuario?.nome || "");
  const [sobrenome, setSobrenome] = useState(usuario?.sobrenome || "");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  function formatarNome(nome) {
    return nome
      .toLowerCase()
      .split(" ")
      .filter((p) => p.trim() !== "")
      .map((p) => p[0].toUpperCase() + p.substring(1))
      .join(" ");
  }

const salvar = async () => {
  setErro("");

  if (!nome.trim()) return setErro("O nome é obrigatório.");
  if (nome.trim().length < 2) return setErro("Nome muito curto.");
  if (!sobrenome.trim()) return setErro("O sobrenome é obrigatório.");
  if (sobrenome.trim().length < 2) return setErro("Sobrenome muito curto.");
  if (senha && senha.length < 6) return setErro("A senha deve ter no mínimo 6 caracteres.");

  setLoading(true);

  try {
    await atualizarMeuUsuarioAPI({
      nome: formatarNome(nome),
      sobrenome: formatarNome(sobrenome),
      senha: senha || undefined,
    });

    // PEGAR O AUTH DO LOCALSTORAGE na chave correta
    const localStorageAutenticacao = localStorage.getItem("gymcontrol/autenticacao");
    if (localStorageAutenticacao) {
      const auth = JSON.parse(localStorageAutenticacao);

      const atualizado = {
        ...auth,
        usuario: {
          ...auth.usuario,
          nome: formatarNome(nome),
          sobrenome: formatarNome(sobrenome),
        },
      };

      localStorage.setItem("gymcontrol/autenticacao", JSON.stringify(atualizado));
    }

    setModalAberto(false);
  } catch (err) {
    setErro("Erro inesperado. " + err.message);
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <Navbar links={[]} />

      <div className="flex justify-center mt-16 px-4">
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 w-full max-w-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
            Meu Perfil
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Nome</p>
              <p className="text-xl font-semibold text-white">
                {usuario?.nome}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">E-mail</p>
              <p className="text-lg text-gray-200">{usuario?.email}</p>
            </div>

            {usuario?.created_at && (
              <div>
                <p className="text-gray-400 text-sm">Conta criada em</p>
                <p className="text-lg text-gray-200">
                  {new Date(usuario.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            )}

            {usuario?.tipo && (
              <div>
                <p className="text-gray-400 text-sm">Tipo de conta</p>
                <p className="text-lg text-gray-200 capitalize">
                  {usuario.tipo}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setModalAberto(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              Editar Perfil
            </h3>

            {erro && (
              <div className="bg-red-600 text-white px-4 py-2 rounded-md mb-3 text-center font-medium">
                {erro}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {/* Nome */}
              <div className="flex flex-col text-left">
                <label className="text-gray-300 mb-1">Nome</label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-white outline-none"
                />
              </div>

              {/* Sobrenome */}
              <div className="flex flex-col text-left">
                <label className="text-gray-300 mb-1">Sobrenome</label>
                <input
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-white outline-none"
                />
              </div>

              {/* Senha */}
              <div className="flex flex-col text-left">
                <label className="text-gray-300 mb-1">
                  Nova senha (opcional)
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-white outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancelar
              </button>

              <button
                onClick={salvar}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold disabled:opacity-50"
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WithAuth(Perfil);
