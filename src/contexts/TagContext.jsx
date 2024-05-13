import { createContext, useState } from "react";

export const TagContext = createContext();

export function TagProvider({ children }) {
    const [tags, setTags] = useState([]);
    const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);
    const [tagModalValues, setTagModalValues] = useState({
        id: "",
        name: "",
    });

    const [loadingTag, setLoadingTag] = useState(false);

    return (
        <TagContext.Provider
            value={{
                tags,
                setTags,
                isCreateTagModalOpen,
                tagModalValues,
                loadingTag,
                setTagModalValues,
                setIsCreateTagModalOpen,
                setLoadingTag,
            }}
        >
            {children}
        </TagContext.Provider>
    );
}
