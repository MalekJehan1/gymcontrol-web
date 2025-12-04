import { useEffect, useState } from "react";
import WithAuthAdmin from "../auth/WithAuthAdmin";
import NavbarPrivada from "../components/NavbarPrivada";

import ConfirmDialog from "../components/dialogs/ConfirmDialog";
import CardUsuarios from "../components/cards/CardUsuarios";
import DialogUsuario from "../components/dialogs/DialogUsuario";

import {
  getUsuariosAPI,
  cadastrarUsuarioAPI,
  atualizarUsuarioAPI,
  deletarUsuarioAPI,
} from "../services/UserService";

import {
  // navbarBase,
  // logoBase,
  // logoText,
  // logoGym,
  // logoControl,
  // linkDefault,
  buttonPrimary,
} from "../utils/navbarBaseClasses";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [usuarioParaDeletar, setUsuarioParaDeletar] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "123",
    tipo: "aluno",
  });

  const carregarUsuarios = async () => {
    setLoading(true);
    const data = await getUsuariosAPI();
    setUsuarios(data);
    setLoading(false);
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const abrirDialogCriar = () => {
    setEditando(null);
    setFormData({
      nome: "",
      sobrenome: "",
      email: "",
      senha: "123",
      tipo: "aluno",
    });
    setDialogOpen(true);
  };

  function formatarNome(nome) {
    return nome
      .toLowerCase()
      .split(" ")
      .filter((p) => p.trim() !== "")
      .map((p) => p[0].toUpperCase() + p.substring(1))
      .join(" ");
  }

  const salvarUsuario = async () => {
    formData.nome = formatarNome(formData.nome);
    formData.sobrenome = formatarNome(formData.sobrenome);

    if (editando) {
      await atualizarUsuarioAPI(editando.id, formData);
    } else {
      await cadastrarUsuarioAPI(formData);
    }

    setDialogOpen(false);
    carregarUsuarios();
  };

  const prepararEdicao = (user) => {
    setEditando(user);
    setFormData({
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
      tipo: user.tipo,
    });
    setDialogOpen(true);
  };

  const deletarUsuario = async () => {
    await deletarUsuarioAPI(usuarioParaDeletar.id);
    setConfirmOpen(false);
    carregarUsuarios();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <NavbarPrivada links={[]} />

      <div className="p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold ">Gerenciar Usuários</h1>

          <button className={buttonPrimary} onClick={abrirDialogCriar}>
            + Novo Usuário
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usuarios.map((u) => (
              <CardUsuarios
                key={u.id}
                usuario={u}
                onEdit={() => prepararEdicao(u)}
                onDelete={(id) => {
                  setUsuarioParaDeletar(id);
                  setConfirmOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <DialogUsuario
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={salvarUsuario}
        formData={formData}
        setFormData={setFormData}
        editando={editando}
      />

      <ConfirmDialog
        open={confirmOpen}
        message="Tem certeza que deseja excluir este usuário?"
        onConfirm={deletarUsuario}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default WithAuthAdmin(UsuariosPage);
