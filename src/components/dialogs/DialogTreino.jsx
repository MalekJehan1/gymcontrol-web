import { Dialog } from "@headlessui/react";
import { useEffect, useState, useCallback } from "react";
import { getExerciciosAPI } from "../../services/ExercicioService";

export default function DialogTreino({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editando,
  treinoEditado, // 👈 recebe o treino completo quando é edição
}) {
  const [exerciciosSistema, setExerciciosSistema] = useState([]);
  const [loadingEx, setLoadingEx] = useState(true);

  // Carrega todos os exercícios do sistema
  const carregarExercicios = useCallback(async () => {
    setLoadingEx(true);
    const lista = await getExerciciosAPI();
    setExerciciosSistema(lista);
    setLoadingEx(false);
  }, []);

  // Quando abrir o modal → carrega exercícios
  useEffect(() => {
    if (open) carregarExercicios();
  }, [open, carregarExercicios]);

  // Quando abrir para editar → popular exerciciosIds
  useEffect(() => {
    if (open && editando && treinoEditado) {
      const ids = treinoEditado.exercicios?.map((e) => e.id) ?? [];

      setFormData((prev) => ({
        ...prev,
        exerciciosIds: ids,
      }));
    }
  }, [open, editando, treinoEditado]);

  const toggleExercicio = (id) => {
    const atual = formData.exerciciosIds ?? [];

    if (atual.includes(id)) {
      setFormData({
        ...formData,
        exerciciosIds: atual.filter((e) => e !== id),
      });
    } else {
      setFormData({
        ...formData,
        exerciciosIds: [...atual, id],
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-neutral-900 border border-neutral-700 p-6 rounded-xl w-full max-w-lg shadow-2xl text-white">
          <Dialog.Title className="text-2xl font-bold mb-4">
            {editando ? "Editar Treino" : "Novo Treino"}
          </Dialog.Title>

          <div className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block mb-1 text-sm text-neutral-300">
                Nome do Treino
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                placeholder="Ex: Treino A – Superiores"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block mb-1 text-sm text-neutral-300">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white h-24"
                placeholder="Descrição do treino..."
              />
            </div>

            {/* Exercícios */}
            <div>
              <label className="block mb-2 text-sm text-neutral-300">
                Exercícios do Treino
              </label>

              {loadingEx ? (
                <p className="text-neutral-400 text-sm">
                  Carregando exercícios...
                </p>
              ) : (
                <div className="max-h-56 overflow-y-auto border border-neutral-700 rounded-lg p-2 bg-neutral-800">
                  {exerciciosSistema.map((ex) => (
                    <label
                      key={ex.id}
                      className="flex items-center gap-2 p-2 hover:bg-neutral-700 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          formData.exerciciosIds?.includes(ex.id) || false
                        }
                        onChange={() => toggleExercicio(ex.id)}
                      />
                      <span>{ex.nome}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-between mt-6 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 w-1/2 bg-neutral-700 hover:bg-neutral-600 rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={onSubmit}
              className="px-4 py-2 w-1/2 bg-blue-600 hover:bg-blue-700 font-bold rounded-lg"
            >
              {editando ? "Salvar Alterações" : "Criar Treino"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
