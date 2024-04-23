import Modal from "../components/Modal"
import Note from "../components/Note"

export default function Home(){
    return(
        <section className="h-screen w-3/4 mx-auto mt-7">
            <h1 className="text-3xl font-bold text-black">Minhas tarefas</h1>
            <Modal />
            <div className="grid grid-cols-2 gap-4">
                <Note
                    title="Fazer trabalho da faculdade"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium adipisci beatae obcaecati recusandae ipsa cupiditate."
                    category="faculdade" 
                />
                <Note
                    title="Fazer trabalho da faculdade"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium adipisci beatae obcaecati recusandae ipsa cupiditate."
                    category="faculdade"
                />
                <Note
                    title="Fazer trabalho da faculdade"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium adipisci beatae obcaecati recusandae ipsa cupiditate."
                />
            </div>
        </section>
    )
}