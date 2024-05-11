import { createContext, useState } from "react";

export const TagContext = createContext()

export function TagProvider({children}){
    const [tags, setTags] = useState([])
    const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false)
    const [currentTagModalValues, setCurrentTagModalValues] = useState({
        id: "",
        title: ""
    })


    return(
        <TagContext.Provider value={{ tags, setTags, isCreateTagModalOpen, currentTagModalValues, setCurrentTagModalValues, setIsCreateTagModalOpen }}>
            {children}
        </TagContext.Provider>
    )
}