import { useContext } from "react";
import { TagContext } from "../contexts/TagContext";
import useRequest from "../hooks/useRequest";

export default function TagModal() {
  const { setTags, currentTagModalValues, setCurrentTagModalValues } =
    useContext(TagContext);
  const { request } = useRequest();

  const handleInput = (e) => {
    setCurrentTagModalValues({
      ...currentTagModalValues,
      title: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const newTag = {
      title: currentTagModalValues.title,
    };

    setTags((prevTags) => [newTag, ...prevTags]);

    document.getElementById("my_modal_3").close();

    console.log(newTag)

    await request("/tags/create-tag", {
      method: "post",
      data: newTag,
    });

    // if (currentTagModalValues.id) {
    //   const updatedTags = tags.map((tag) => {
    //     if (tag.id === currentTagModalValues.id) {
    //       return { ...tag, ...currentTagModalValues };
    //     }
    //     return tag;
    //   });
    //   setTags(updatedTags);
    // } else {
    //   const newTag = {
    //     id: Date.now(),
    //     title: currentTagModalValues.title,
    //   };
    //   setTags((prevTags) => [newTag, ...prevTags]);
    // }
    setCurrentTagModalValues({ id: "", title: "" });
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <form onSubmit={handleOnSubmit} className="modal-box bg-lime-200">
        <div className="flex">
          <input
            type="text"
            className="bg-transparent placeholder-lime-700 text-lg text-black font-bold w-full outline-none p-text-area"
            name="title"
            placeholder="Nome"
            value={currentTagModalValues.title}
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
