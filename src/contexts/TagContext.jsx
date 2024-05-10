import { createContext, useState } from "react";

export const TagContext = createContext()

export function TagProvider({children}){
    const [tags, setTags] = useState([])
    const [currentTagModalValues, setCurrentTagModalValues] = useState({
        id: "",
        title: ""
    })


    return(
        <TagContext.Provider value={{ tags, currentTagModalValues }}>
            {children}
        </TagContext.Provider>
    )
}