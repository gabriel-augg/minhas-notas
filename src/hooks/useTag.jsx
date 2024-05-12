import { useContext } from "react";
import { TagContext } from "../contexts/TagContext";
import useRequest from "./useRequest";

const useTag = () => {
    const {
        tags,
        setTags,
        tagModalValues,
    } = useContext(TagContext);
    const { request } = useRequest();

    const createTag = async () => {
        const newTag = {
            name: tagModalValues.name,
        };

        setTags((prevTags) => [newTag, ...prevTags]);

        document.getElementById("my_modal_3").close();

        await request("/tags/create", {
            method: "post",
            data: newTag,
        });
    };

    const updateTag = async () => {

        const id = tagModalValues.id;

        const updatedTag = {
            id: tagModalValues.id,
            name: tagModalValues.name,
        };

        const updatedTags = tags.map((tag) => {
            if (tag.id === updatedTag.id) {
                return updatedTag;
            }
            return tag;
        });

        setTags(updatedTags);

        document.getElementById("my_modal_3").close();

        await request(`/tags/${id}/update`, {
            method: "patch",
            data: updatedTag,
        });
    };

    const deleteTag = async (id) => {
      
        const updatedTags = tags.filter((tag) => tag.id !== id);
    
        setTags(updatedTags);
    
        document.getElementById("my_modal_3").close();
    
        await request(`/tags/${id}/delete`, {
          method: "delete",
        });
      }

    return { createTag, updateTag, deleteTag };
}

export default useTag;