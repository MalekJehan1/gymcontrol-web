import { useEffect, useState } from "react";
import WithAuthAdmin from "../auth/WithAuthAdmin";
import NavbarPrivada from "../components/NavbarPrivada";

import ConfirmDialog from "../components/dialogs/ConfirmDialog";
import CardExercicio from "../components/cards/CardExercicio";
import DialogExercicio from "../components/dialogs/DialogExercicio";

import {
  getExerciciosAPI,
  cadastrarExercicioAPI,
  atualizarExercicioAPI,
  deletarExercicioAPI,
} from "../services/ExercicioService";

import { buttonPrimary } from "../utils/navbarBaseClasses";

function ExerciciosPage() {
  const [exercicios, setExercicios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [exercicioParaDeletar, setExercicioParaDeletar] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    equipamento: "",
    descricao: "",
  });

  const carregarExercicios = async () => {
    setLoading(true);
    const data = await getExerciciosAPI();
    setExercicios(data);
    setLoading(false);
  };

  useEffect(() => {
    carregarExercicios();
  }, []);

  const abrirDialogCriar = () => {
    setEditando(null);
    setFormData({
      nome: "",
      categoria: "",
      equipamento: "",
      descricao: "",
    });
    setDialogOpen(true);
  };

  const salvarExercicio = async () => {
    if (editando) {
      await atualizarExercicioAPI(editando.id, formData);
    } else {
      await cadastrarExercicioAPI(formData);
    }

    setDialogOpen(false);
    carregarExercicios();
  };

  const prepararEdicao = (ex) => {
    setEditando(ex);
    setFormData({
      nome: ex.nome,
      categoria: ex.categoria,
      equipamento: ex.equipamento,
      descricao: ex.descricao,
    });
    setDialogOpen(true);
  };

  const deletarExercicio = async () => {
    await deletarExercicioAPI(exercicioParaDeletar.id);
    setConfirmOpen(false);
    carregarExercicios();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <NavbarPrivada links={[]} />

      <div className="p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Exercícios</h1>

          <button className={buttonPrimary} onClick={abrirDialogCriar}>
            + Novo Exercício
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercicios.map((ex) => (
              <CardExercicio
                key={ex.id}
                exercicio={ex}
                onEdit={() => prepararEdicao(ex)}
                onDelete={() => {
                  setExercicioParaDeletar(ex);
                  setConfirmOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <DialogExercicio
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={salvarExercicio}
        formData={formData}
        setFormData={setFormData}
        editando={editando}
      />

      <ConfirmDialog
        open={confirmOpen}
        message="Tem certeza que deseja excluir este exercício?"
        onConfirm={deletarExercicio}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default WithAuthAdmin(ExerciciosPage);
