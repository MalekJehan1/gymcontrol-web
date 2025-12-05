import { Dialog } from "@headlessui/react";

export default function DialogTreinoDetalhes({ open, onClose, treino }) {
  if (!treino) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-neutral-900 border border-neutral-700 p-6 rounded-xl w-full max-w-lg shadow-xl">
          <Dialog.Title className="text-2xl font-bold text-white mb-4">
            {treino.nome}
          </Dialog.Title>

          <p className="text-neutral-300 mb-4">
            {treino.descricao || "Sem descrição"}
          </p>

          <p className="text-neutral-300 mb-1">
            Professor: {treino.professor?.usuario?.nome || "Não informado"}
          </p>
          <p className="text-neutral-300 mb-4">
            Aluno: {treino.aluno?.usuario?.nome || "Não informado"}
          </p>

          <h3 className="text-lg font-semibold mb-2 text-sky-600">
            Exercícios
          </h3>

          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-2">
            {treino.exercicios?.map((ex, i) => (
              <div
                key={i}
                className="bg-neutral-800 p-3 rounded-lg border border-neutral-700"
              >
                <h4 className="font-semibold text-white">{ex.nome}</h4>

                <p className="text-neutral-400 text-sm">
                  {ex.descricao || "Sem detalhes"}
                </p>

                <div className="text-sm text-blue-400 mt-1">
                  {ex.series} séries • {ex.repeticoes} reps •{" "}
                  {ex.descanso_segundos}s descanso
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 text-red-50"
            >
              Fechar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
