import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import { RiPushpin2Fill } from "react-icons/ri";
import useNote from "../hooks/useNote";

export default function Note({ id, title, description, tag, pinned }) {
    const { setNoteModalValues, setIsCreateNoteModalOpen } =
        useContext(NoteContext);

    const { clearNoteModalValues } = useNote();

    const { showNoteModal } = useNote();

    function handleShowModal() {
        setIsCreateNoteModalOpen(false);

        clearNoteModalValues();

        setNoteModalValues({
            id,
            title,
            description,
            tag,
            pinned,
        });

        showNoteModal();
    }

    return (
        <article
            onClick={handleShowModal}
            className="bg-lime-200 p-4 rounded-xl cursor-pointer border hover:border-lime-500 drop-shadow-md h-fit min-h-28"
        >
            <div className="flex justify-between">
                <h1 className="text-black font-bold text-xl mb-3 break-all">
                    {title}
                </h1>
                {pinned && (
                    <span>
                        <RiPushpin2Fill className="text-lime-800" size={25} />
                    </span>
                )}
            </div>
            {!title && !description && (
                <h1 className="text-lime-700 font-bold text-xl">Nota vazia</h1>
            )}
            <p className="text-black text-md mb-2 break-all">{description}</p>

            {tag && (
                <div className="flex justify-end mt-5">
                    <span className="px-3 bg-lime-600 text-white rounded-3xl">
                        {tag}
                    </span>
                </div>
            )}
        </article>
    );
}
