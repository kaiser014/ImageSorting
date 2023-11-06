import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function ImageSortableItem(props){
    const{imageID, imageURL, imageName} = props;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: imageID});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return(
        <>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <img src={imageURL} alt={imageName}/>
            </div>
        </>
    )
}