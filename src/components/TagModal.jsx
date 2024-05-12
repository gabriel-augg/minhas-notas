import { useContext } from "react";
import { TagContext } from "../contexts/TagContext";
import useTag from "../hooks/useTag";

export default function TagModal() {
    const {
        tagModalValues,
        setTagModalValues,
        isCreateTagModalOpen,
    } = useContext(TagContext);

    const { createTag, updateTag } = useTag();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (isCreateTagModalOpen) {
            await createTag();
        } else {
            await updateTag();
        }

        setTagModalValues({ id: "", name: "" });
    };

    const handleInput = (e) => {
        setTagModalValues({
            ...tagModalValues,
            name: e.target.value,
        });
    };

    return (
        <dialog id="my_modal_3" className="modal">
            <form onSubmit={handleOnSubmit} className="modal-box bg-lime-200">
                <div className="flex">
                    <input
                        type="text"
                        className="bg-transparent placeholder-lime-700 text-lg text-black font-bold w-full outline-none p-text-area"
                        name="name"
                        placeholder="Nome"
                        value={tagModalValues.name}
                        onChange={handleInput}
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
