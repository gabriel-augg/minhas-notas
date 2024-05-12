import { createContext, useState } from "react";

export const TagContext = createContext();

export function TagProvider({ children }) {
    const [tags, setTags] = useState([]);
    const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);
    const [tagModalValues, setTagModalValues] = useState({
        id: "",
        name: "",
    });

    return (
        <TagContext.Provider
            value={{
                tags,
                setTags,
                isCreateTagModalOpen,
                tagModalValues,
                setTagModalValues,
                setIsCreateTagModalOpen,
            }}
        >
            {children}
        </TagContext.Provider>
    );
}
