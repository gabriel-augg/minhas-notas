import Tag from "./Tag"

export default function TagsList({tags}){
    return tags.map((tag) => {
        return(
            <Tag
                key={tag.id}
                id={tag.id}
                name={tag.name} 
            />
        )

    })
}