import useRequest from "../hooks/useRequest";
import { useContext, useEffect } from "react";
import { NoteContext } from "../contexts/NoteContext";
import { FaTrash } from "react-icons/fa6";
import { RiPushpin2Line } from "react-icons/ri";
import { RiPushpin2Fill } from "react-icons/ri";

import { IoMdPricetags } from "react-icons/io";
import { TagContext } from "../contexts/TagContext";

export default function NoteModal() {
  const {
    isCreation, 
    currentModalValues,
    setCurrentModalValues,
    setNotes,
    setIsLoading,
  } = useContext(NoteContext);
  const { tags } = useContext(TagContext);
  const { request } = useRequest();


  async function createNote() {
    if (currentModalValues.pinned) {
      setNotes((prevNotes) => [currentModalValues, ...prevNotes]);
    } else {
      setNotes((prevNotes) => {
        const pinnedNotes = prevNotes.filter((note) => note.pinned);
        const otherNotes = prevNotes.filter((note) => !note.pinned);
        return [...pinnedNotes, currentModalValues, ...otherNotes];
      });

      await request("/notes/create", {
        method: "post",
        data: currentModalValues,
      });
    }
  }

  async function updateNote() {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.id === currentModalValues.id) {
          return { ...note, ...currentModalValues };
        }
        return note;
      });

      const pinnedNoteIndex = updatedNotes.findIndex(
        (note) => note.id === currentModalValues.id && currentModalValues.pinned
      );

      if (pinnedNoteIndex !== -1) {
        const pinnedNote = updatedNotes.splice(pinnedNoteIndex, 1)[0];
        updatedNotes.unshift(pinnedNote);
      }

      return updatedNotes;
    });

    await request(`/notes/update/${currentModalValues.id}`, {
      method: "put",
      data: currentModalValues,
    });
  }

  async function deleteNote() {
    setIsLoading(true);

    setNotes((prevNotes) => {
      const notes = prevNotes.filter(
        (note) => note.id !== currentModalValues.id
      );
      return [...notes];
    });

    document.getElementById("my_modal_2").close();

    await request(`/notes/delete/${currentModalValues.id}`, {
      method: "delete",
    });

    setIsLoading(false);
  }

  async function handleOnSubmit(e) {
    setIsLoading(true);

    e.preventDefault();

    document.getElementById("my_modal_2").close();

    if (isCreation) {
      await createNote();
    } else {
      await updateNote();
    }

    setIsLoading(false);
  }

  function handleInput(e) {
    setCurrentModalValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  }

  function handlePinned() {
    setCurrentModalValues((prevValues) => ({
      ...prevValues,
      pinned: !prevValues.pinned,
    }));
  }

  return (
    <dialog id="my_modal_2" className="modal">
      <form onSubmit={handleOnSubmit} className="modal-box bg-lime-200">
        <div className="flex">
          <input
            type="text"
            className="bg-transparent placeholder-lime-700 text-lg text-black font-bold w-full outline-none p-text-area"
            name="title"
            placeholder="Título"
            value={currentModalValues.title}
            onChange={handleInput}
          />
          <button
            className="hover:bg-lime-100 p-1 rounded-full"
            type="button"
            onClick={handlePinned}
          >
            {currentModalValues.pinned ? (
              <RiPushpin2Fill className="text-lime-800" size={30} />
            ) : (
              <RiPushpin2Line className="text-lime-800" size={30} />
            )}
          </button>
        </div>

        <textarea
          type="text"
          name="description"
          value={currentModalValues.description}
          onChange={handleInput}
          placeholder="Nota"
          className="bg-transparent placeholder-lime-700 py-4 text-black w-full resize-none outline-none overflow-hidden"
        />
        <div className="flex mt-5 justify-between">
          <div className="relative">
            <select
              className="block appearance-none w-full bg-lime-500 text-white cursor-pointer rounded-xl  px-3 py-1 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline"
              name="tag"
              value={currentModalValues.tag}
              onChange={handleInput}
            >
              <option defaultChecked>Tags</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.title}>
                  {tag.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none text-white absolute inset-y-0 right-0 flex items-center px-2 ">
              <IoMdPricetags size={18} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isCreation && (
              <button
                type="button"
                onClick={deleteNote}
                className="hover:bg-red-100 p-2 rounded-full"
              >
                <FaTrash
                  className="text-red-30 text-red-400 transition-all duration-100"
                  size={20}
                />
              </button>
            )}

            <button
              type="submit"
              className="bg-lime-600 p-1 px-3 hover:bg-lime-800 text-white rounded-xl font-bold"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
