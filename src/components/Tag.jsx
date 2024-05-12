import { useContext } from "react";
import { FaTrash } from "react-icons/fa6";
import { TagContext } from "../contexts/TagContext";
import useTag from "../hooks/useTag";

export default function Tag({ id, name }) {
    const { setTagModalValues, setIsCreateTagModalOpen } =
        useContext(TagContext);

    function handleShowModal() {
        setIsCreateTagModalOpen(false);

        setTagModalValues({
            id,
            name,
        });

        document.getElementById("my_modal_3").showModal();
    }

    const { deleteTag } = useTag();

    return (
        <li>
            <div className="flex justify-between p-1">
                <button
                    className="font-bold hover:bg-lime-600 px-2 rounded-lg w-full text-start text-sm"
                    onClick={handleShowModal}
                >
                    {name}
                </button>
                <button
                    onClick={() => deleteTag(id)}
                    className="p-1 rounded-full hover:bg-red-200"
                >
                    <FaTrash className="text-red-400" size={15} />
                </button>
            </div>
        </li>
    );
}
