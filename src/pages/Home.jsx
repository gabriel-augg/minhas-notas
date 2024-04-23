import Modal from "../components/Modal"
import Note from "../components/Note"
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";

export default function Home() {
    return (
        <section className="h-screen w-3/4 mx-auto mt-7">
            <h1 className="text-3xl font-bold text-black">Minhas tarefas</h1>
            <Modal />
            <div className="flex justify-between my-4">
                <div>
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="flex items-center bg-lime-500 text-white gap-1 rounded-xl font-bold p-1 px-2">
                            <FaSort size={20}/>
                            Ordenar
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-52">
                            <li><a>Faculdade</a></li>
                            <li><a>Trabalho</a></li>
                        </ul>
                    </div>

                </div>
                <div className="flex gap-3">
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="flex items-center bg-lime-500 text-white gap-1 rounded-xl font-bold p-1 px-2">
                            <FaTags size={18} />
                            Tags
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-52">
                            <li><a>Faculdade</a></li>
                            <li><a>Trabalho</a></li>
                        </ul>
                    </div>
                    <button onClick={()=>document.getElementById('my_modal_2').showModal()} className="flex items-center bg-lime-500 text-white gap-1 rounded-xl font-bold p-1 px-2">
                        <RiStickyNoteAddFill size={18} />
                        Adicionar
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Note
                    title="Fazer trabalho da faculdade"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium adipisci beatae obcaecati recusandae ipsa cupiditate."
                    tag="faculdade"
                    pinned={true}
                />
                <Note
                    title="Fazer trabalho da faculdade"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium adipisci beatae obcaecati recusandae ipsa cupiditate."
                    tag="faculdade"
                />
                <Note
                    title="Fazer trabalho da faculdade"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium adipisci beatae obcaecati recusandae ipsa cupiditate."
                />
            </div>
        </section>
    )
}