import { useEffect, useState } from "react";
import WithAuthAdmin from "../auth/WithAuthAdmin";
import NavbarPrivada from "../components/NavbarPrivada";

import ConfirmDialog from "../components/dialogs/ConfirmDialog";
import DialogTreino from "../components/dialogs/DialogTreino";
import DialogTreinoDetalhes from "../components/dialogs/DialogTreinoDetalhes";
import CardTreino from "../components/cards/CardTreino";

import {
  getTreinosAPI,
  cadastrarTreinoAPI,
  atualizarTreinoAPI,
  deletarTreinoAPI,
} from "../services/TreinoService";

import { buttonPrimary } from "../utils/navbarBaseClasses";
import { getUsuario } from "../auth/Autenticacao";

function TreinosAdminPage() {
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDetalhesOpen, setDialogDetalhesOpen] = useState(false);

  const [treinoSelecionado, setTreinoSelecionado] = useState(null);
  const [editando, setEditando] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [treinoParaDeletar, setTreinoParaDeletar] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  });

  const usuario = getUsuario();

  const carregarTreinos = async () => {
    setLoading(true);
    const data = await getTreinosAPI();
    setTreinos(data);
    setLoading(false);
  };

  useEffect(() => {
    carregarTreinos();
  }, []);

  const abrirDialogCriar = () => {
    console.log("abrirDialogCriar");
    setEditando(null);
    setFormData({
      nome: "",
      descricao: "",
    });
    setDialogOpen(true);
  };

  const prepararEdicao = (treino) => {
    setEditando(treino);
    setFormData({
      nome: treino.nome,
      descricao: treino.descricao,
    });
    setDialogOpen(true);
  };

  const salvarTreino = async () => {
    if (editando) {
      await atualizarTreinoAPI(editando.id, formData);
    } else {
      await cadastrarTreinoAPI(formData);
    }

    setDialogOpen(false);
    carregarTreinos();
  };

  const deletarTreino = async () => {
    await deletarTreinoAPI(treinoParaDeletar.id);
    setConfirmOpen(false);
    carregarTreinos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <NavbarPrivada />

      <div className="p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Treinos</h1>
          {usuario.tipo === "admin" && (
            <button className={buttonPrimary} onClick={abrirDialogCriar}>
              + Novo Treino
            </button>
          )}
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {treinos.map((treino) => (
              <CardTreino
                key={treino.id}
                treino={treino}
                isAdmin={usuario.tipo === "admin"}
                onDetalhes={(t) => {
                  setTreinoSelecionado(t);
                  setDialogDetalhesOpen(true);
                }}
                onEditar={(t) => prepararEdicao(t)}
                onExcluir={(t) => {
                  setTreinoParaDeletar(t);
                  setConfirmOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Criar/Editar */}
      <DialogTreino
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={salvarTreino}
        formData={formData}
        setFormData={setFormData}
        editando={editando}
      />

      {/* Modal Detalhes com Exercícios */}
      <DialogTreinoDetalhes
        open={dialogDetalhesOpen}
        onClose={() => setDialogDetalhesOpen(false)}
        treino={treinoSelecionado}
        admin={usuario.tipo === "admin"} // libera botões de editar/adicionar exercício
      />

      <ConfirmDialog
        open={confirmOpen}
        message="Tem certeza que deseja excluir este treino?"
        onConfirm={deletarTreino}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default TreinosAdminPage;
