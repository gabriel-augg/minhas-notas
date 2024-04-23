import { FaTrash } from "react-icons/fa6";

export default function Modal() {
    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-lime-200">
                <input type="text" className="bg-transparent text-lg text-black font-bold w-full outline-none" value="Hello!" />
                <input type="text" className="bg-transparent py-4 text-black w-full outline-none" value="Press ESC key or click outside to close!" />
                <div className="flex justify-end">
                    <button>
                        <FaTrash className="text-red-300 hover:text-red-400 transition-all duration-100" size={20} />
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

    )
}