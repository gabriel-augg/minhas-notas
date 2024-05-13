import { useContext } from "react";
import { TagContext } from "../contexts/TagContext";
import useRequest from "./useRequest";
import generateID from "../utils/generateID";

const useTag = () => {
    const {
        tags,
        setTags,
        tagModalValues,
        setTagModalValues,
    } = useContext(TagContext);
    const { request } = useRequest();

    const closeTagModal = () => {
        document.getElementById("my_modal_3").close();
    }

    const clearTagModalValues = () => {
        setTagModalValues({ id: "", name: "" });
    }

    const createTag = async () => {
        const newTag = {
            id: generateID(),
            name: tagModalValues.name,
        };

        closeTagModal();

        if(newTag.name === "") return;

        setTags((prevTags) => [newTag, ...prevTags]);

        clearTagModalValues();

        await request("/tags/create", {
            method: "post",
            data: newTag,
        });
    };

    const updateTag = async () => {

        const tagId = tagModalValues.id;

        const updatedTag = {
            name: tagModalValues.name,
        };

        closeTagModal();

        if(updatedTag.name === "") return;

        const updatedTags = tags.map((tag) => {
            if (tag.id === tagId) {
                return updatedTag;
            }
            return tag;
        });

        setTags(updatedTags);

        clearTagModalValues();

        await request(`/tags/${tagId}/update`, {
            method: "patch",
            data: updatedTag,
        });
    };

    const deleteTag = async (tagId) => {
      
        const updatedTags = tags.filter((tag) => tag.id !== tagId);
    
        setTags(updatedTags);
    
        closeTagModal();
    
        await request(`/tags/${tagId}/delete`, {
          method: "delete",
        });
      }

    return { createTag, updateTag, deleteTag };
}

export default useTag;