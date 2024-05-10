

export default function TagModal() {
  return (
    <dialog id="my_modal_3" className="modal">
      <form className="modal-box bg-lime-200">
        <div className="flex">
          <input
            type="text"
            className="bg-transparent placeholder-lime-700 text-lg text-black font-bold w-full outline-none p-text-area"
            name="title"
            placeholder="Nome"
            value=""
          />
          <button
            type="submit"
            className="bg-lime-600 p-1 px-3 hover:bg-lime-800 text-white rounded-xl font-bold"
          >
            Salvar
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
