import { Dialog } from "@headlessui/react";

export default function DialogUsuario({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editando,
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* fundo escuro */}
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      {/* Centro do dialog */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-neutral-900 border border-neutral-700 p-6 rounded-xl w-full max-w-md shadow-2xl">
          <Dialog.Title className="text-xl font-bold mb-4 text-white">
            {editando ? "Editar Usuário" : "Criar Usuário"}
          </Dialog.Title>

          <div className="flex flex-col gap-3">
            <input
              placeholder="Nome"
              className="p-2 rounded bg-neutral-800 text-white"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />

            <input
              placeholder="Sobrenome"
              className="p-2 rounded bg-neutral-800 text-white"
              value={formData.sobrenome}
              onChange={(e) =>
                setFormData({ ...formData, sobrenome: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="p-2 rounded bg-neutral-800 text-white"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <select
              className="p-2 rounded bg-neutral-800 text-white"
              value={formData.tipo}
              onChange={(e) =>
                setFormData({ ...formData, tipo: e.target.value })
              }
            >
              <option value="admin">Administrador</option>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-600 text-white"
            >
              Cancelar
            </button>

            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 font-semibold text-white"
            >
              {editando ? "Salvar Alterações" : "Criar Usuário"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
