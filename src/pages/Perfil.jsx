import Navbar from "../components/NavbarPrivada";
import WithAuth from "../auth/WithAuth";
import { getUsuario } from "../auth/Autenticacao";

function Perfil() {
  const usuario = getUsuario();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      {/* NAVBAR */}
      <Navbar
        links={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Treinos", to: "/treinos" },
        ]}
      />

      {/* CONTEÚDO */}
      <div className="flex justify-center mt-16 px-4">
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 w-full max-w-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
            Meu Perfil
          </h2>

          {/* Dados do usuário */}
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

          {/* Botão editar */}
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Perfil);
