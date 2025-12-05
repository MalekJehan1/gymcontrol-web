export default function CardExercicio({ exercicio, onEdit, onDelete }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 flex justify-between items-center shadow-lg">
      <div>
        <h2 className="text-xl font-bold mb-1">{exercicio.nome}</h2>

        <p className="text-sm text-neutral-300">
          <strong>Equipamento:</strong> {exercicio.equipamento || "—"}
        </p>

        <p className="text-sm text-neutral-400 mt-2 line-clamp-3">
          {exercicio.descricao || "Sem descrição"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="px-3 py-1 text-sm bg-yellow-600 rounded-lg hover:bg-yellow-500"
          onClick={() => onEdit(exercicio)}
        >
          Editar
        </button>

        <button
          className="px-3 py-1 text-sm bg-red-600 rounded-lg hover:bg-red-500"
          onClick={() => onDelete(exercicio.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
