import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        {/* Fundo escurecido */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Conteúdo do Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="bg-neutral-900 text-white w-full max-w-sm rounded-xl shadow-lg p-6 border border-neutral-700">
              <Dialog.Title className="text-xl font-semibold text-red-400">
                Confirmar ação
              </Dialog.Title>

              <p className="mt-3 text-neutral-300">{message}</p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition"
                >
                  Cancelar
                </button>

                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-semibold transition"
                >
                  Confirmar
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
