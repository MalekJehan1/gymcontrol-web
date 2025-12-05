export default function CardUsuarios({ usuario, onEdit, onDelete }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 flex justify-between items-center shadow-lg">
      <div>
        <h3 className="text-lg font-semibold text-white capitalize">
          <span>Nome:</span> {usuario.nome} {usuario.sobrenome}
        </h3>
        <p className="text-neutral-300">Email: {usuario.email}</p>
        <p className="text-sm capitalize text-neutral-400">
          Tipo: {usuario.tipo}
        </p>

        <p className="text-sm  text-neutral-400">
          Criado em: {new Date(usuario.created_at).toLocaleDateString("pt-BR")}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="px-3 py-1 text-sm bg-yellow-600 rounded-lg hover:bg-yellow-500"
          onClick={() => onEdit(usuario)}
        >
          Editar
        </button>

        <button
          className="px-3 py-1 text-sm bg-red-600 rounded-lg hover:bg-red-500"
          onClick={() => onDelete(usuario.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
