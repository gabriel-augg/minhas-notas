import { useContext } from "react";
import { TagContext } from "../contexts/TagContext";
import useRequest from "./useRequest";
import generateID from "../utils/generateID";
import { set } from "react-hook-form";

const useTag = () => {
    const {
        tags,
        loadingTag,
        setTags,
        tagModalValues,
        setTagModalValues,
        setLoadingTag,
    } = useContext(TagContext);
    const { request } = useRequest();

    const closeTagModal = () => {
        document.getElementById("my_modal_3").close();
    }

    const clearTagModalValues = () => {
        setTagModalValues({ id: "", name: "" });
    }

    const createTag = async () => {
        setLoadingTag(true);
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
        setLoadingTag(false);
    };

    const updateTag = async () => {
        setLoadingTag(true);
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
        setLoadingTag(false);
    };

    const deleteTag = async (tagId) => {
        setLoadingTag(true);
        const updatedTags = tags.filter((tag) => tag.id !== tagId);
    
        setTags(updatedTags);
    
        closeTagModal();
    
        await request(`/tags/${tagId}/delete`, {
          method: "delete",
        });
        setLoadingTag(false);
      }

    return { createTag, updateTag, deleteTag, clearTagModalValues };
}

export default useTag;