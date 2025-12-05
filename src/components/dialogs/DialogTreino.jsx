import { Dialog } from "@headlessui/react";
import { useEffect, useState, useCallback } from "react";
import { getExerciciosAPI } from "../../services/ExercicioService";
import { getProfessoresAPI } from "../../services/ProfessorService"; // NOVO
import { getAlunosAPI } from "../../services/AlunoService"; // NOVO

export default function DialogTreino({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editando,
  treinoEditado,
  usuario,
}) {
  const [exerciciosSistema, setExerciciosSistema] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [loadingEx, setLoadingEx] = useState(true);
  const [loadingProf, setLoadingProf] = useState(true);
  const [loadingAlunos, setLoadingAlunos] = useState(true);

  // Buscar exercícios
  const carregarExercicios = useCallback(async () => {
    setLoadingEx(true);
    const lista = await getExerciciosAPI();
    setExerciciosSistema(lista);
    setLoadingEx(false);
  }, []);

  // Buscar professores
  const carregarProfessores = useCallback(async () => {
    setLoadingProf(true);
    const lista = await getProfessoresAPI();
    setProfessores(lista);
    setLoadingProf(false);
  }, []);

  // Buscar alunos
  const carregarAlunos = useCallback(async () => {
    setLoadingAlunos(true);
    const lista = await getAlunosAPI();
    setAlunos(lista);
    setLoadingAlunos(false);
  }, []);

  useEffect(() => {
    if (open) {
      carregarExercicios();
      carregarProfessores();
      carregarAlunos();
    }
  }, [open, carregarExercicios, carregarProfessores, carregarAlunos]);

  // Inicializa formData
  useEffect(() => {
    if (!open) return;

    let professorId = null;
    let alunoId = null;

    if (editando && treinoEditado) {
      professorId = treinoEditado.professor_id ?? null;
      alunoId = treinoEditado.aluno_id ?? null;
    } else if (usuario.tipo === "professor") {
      // professor logado
      const prof = professores.find((p) => p.usuario_id === usuario.id);
      professorId = prof ? prof.professor_id : null;
    }

    setFormData({
      id: treinoEditado?.id ?? null,
      nome: treinoEditado?.nome ?? "",
      descricao: treinoEditado?.descricao ?? "",
      professor_id: professorId,
      aluno_id: alunoId,
      exercicios:
        treinoEditado?.exercicios?.map((e) => ({
          id: e.id,
          series: e.series ?? 0,
          repeticoes: e.repeticoes ?? 0,
          descanso_segundos: e.descanso_segundos ?? 0,
        })) ?? [],
    });
  }, [
    open,
    editando,
    treinoEditado,
    professores,
    alunos,
    usuario.id,
    usuario.tipo,
    setFormData,
  ]);

  // Alternar exercício
  const toggleExercicio = (id) => {
    const exists = formData.exercicios?.some((e) => e.id === id);
    setFormData({
      ...formData,
      exercicios: exists
        ? formData.exercicios.filter((e) => e.id !== id)
        : [
            ...formData.exercicios,
            { id, series: 3, repeticoes: 10, descanso_segundos: 60 },
          ],
    });
  };

  const updateExercicio = (id, campo, valor) => {
    setFormData({
      ...formData,
      exercicios: formData.exercicios.map((e) =>
        e.id === id ? { ...e, [campo]: Number(valor) } : e
      ),
    });
  };

  // Validação antes de salvar
  const handleSubmit = () => {
    console.log("handleSubmit", formData);
    if (
      (usuario.tipo === "admin" && !formData.professor_id) ||
      !formData.aluno_id
    ) {
      alert("Por favor, selecione um professor e um aluno antes de salvar.");
      return;
    }
    onSubmit();
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
                className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
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
                className="w-full p-2 h-12 rounded bg-neutral-800 border border-neutral-700"
              />
            </div>

            {/* Select PROFESSOR */}
            {usuario.tipo === "admin" && (
              <div>
                <label className="block mb-1 text-sm text-neutral-300">
                  Professor
                </label>
                {loadingProf ? (
                  <p>Carregando...</p>
                ) : (
                  <select
                    value={formData.professor_id ?? ""} // deve corresponder ao ID da tabela professores
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        professor_id: Number(e.target.value),
                      })
                    }
                    className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
                  >
                    <option value="">Selecione um professor...</option>
                    {professores.map((p) => (
                      <option key={p.professor_id} value={p.professor_id}>
                        {p.nome} {p.sobrenome}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {/* PROFESSOR LOGADO */}
            {usuario.tipo === "professor" && (
              <p className="text-sm text-neutral-400">
                Professor: <span className="text-blue-400">{usuario.nome}</span>
              </p>
            )}

            {/* Select ALUNO */}
            <div>
              <label className="block mb-1 text-sm text-neutral-300">
                Aluno
              </label>
              {loadingAlunos ? (
                <p>Carregando...</p>
              ) : (
                <select
                  value={formData.aluno_id ?? ""} // formData.aluno_id deve ser o ID da tabela Alunos
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      aluno_id: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
                >
                  <option value="">Selecione um aluno...</option>
                  {alunos.map((a) => (
                    <option key={a.aluno_id} value={a.aluno_id}>
                      {a.nome} {a.sobrenome}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Exercícios */}
            <div>
              <label className="block mb-1 text-sm text-neutral-300">
                Exercícios
              </label>
              {loadingEx ? (
                <p>Carregando exercícios...</p>
              ) : (
                <div className="max-h-56 overflow-y-auto border border-neutral-700 rounded-lg p-2 bg-neutral-800">
                  {exerciciosSistema.map((ex) => {
                    const marcado = formData.exercicios?.some(
                      (e) => e.id === ex.id
                    );
                    return (
                      <label
                        key={ex.id}
                        className="flex flex-col gap-2 p-2 hover:bg-neutral-700 rounded-lg border border-neutral-700"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={marcado}
                            onChange={() => toggleExercicio(ex.id)}
                            className="h-4 w-4 accent-blue-500"
                          />
                          <span>{ex.nome}</span>
                        </div>
                        {marcado && (
                          <div className="ml-7 grid grid-cols-3 gap-2">
                            {["series", "repeticoes", "descanso_segundos"].map(
                              (campo, idx) => (
                                <div className="flex flex-col" key={idx}>
                                  <span className="block mb-1 text-sm text-neutral-200">
                                    {campo === "series"
                                      ? "Séries"
                                      : campo === "repeticoes"
                                      ? "Reps"
                                      : "Descanso"}
                                  </span>
                                  <input
                                    type="number"
                                    value={
                                      formData.exercicios.find(
                                        (e) => e.id === ex.id
                                      )?.[campo] ?? 0
                                    }
                                    onChange={(ev) =>
                                      updateExercicio(
                                        ex.id,
                                        campo,
                                        ev.target.value
                                      )
                                    }
                                    className="p-2 bg-neutral-900 border border-neutral-600 rounded w-full"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-between mt-6 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 w-1/2 bg-neutral-700 rounded-lg hover:bg-neutral-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 w-1/2 bg-blue-600 hover:bg-blue-700 font-bold rounded-lg"
            >
              {editando ? "Salvar" : "Criar Treino"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
