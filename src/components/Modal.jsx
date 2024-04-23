import { FaTrash } from "react-icons/fa6";
import { RiPushpin2Line } from "react-icons/ri";


export default function Modal() {
    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-lime-200">
                <div className="flex">
                    <input type="text" className="bg-transparent text-lg text-black font-bold w-full outline-none" value="Hello!" />
                    <button>
                        <RiPushpin2Line className="text-lime-800" size={30} />
                    </button>
                </div>

                <textarea type="text" className="bg-transparent py-4 text-black w-full resize-none outline-none overflow-hidden h-auto" value="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus fuga aliquid facilis iste expedita perferendis, tempora nobis quam nesciunt ipsa quisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat uisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat uisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat uisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat uisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat uisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat uisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat uisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat uisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat uisquam fugit explicabo vel esse adipisci corrupti excepturi hic quaerat." />
                <div className="flex mt-5 justify-between">
                    <select className="outline-none rounded-xl p-1 px-2 bg-lime-700 text-white">
                        <option>Selecione</option>
                        <option>Faculdade</option>
                        <option>Escola</option>
                    </select>
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