import React from 'react';
// import imageList from '../data/imageList';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState, useRef } from 'react';
import { ImageSortableItem } from '../ImageSortable/ImageSortableItems';
import './imagecomponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
const ImageComponent = () => {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEnd = (event) => {
        const {active, over} = event;
        if (active.id === over.id) {
            return;
        }
        setImages((items) => {
            const activeIndex = items.findIndex((item) => item.id === active.id);
            const overIndex = items.findIndex((item) => item.id === over.id);

            return arrayMove(items, activeIndex, overIndex);

        });
    };
    function selectFiles(){
        fileInputRef.current.click();
    };
    function onFilesSelect(e){
        const files = e.target.files;
        console.log(files)
        if(files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if(files[i].type.split('/')[0] !== 'image') continue;
            if(!images.some((e) => e.name === files[i].name)){
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        id: URL.createObjectURL(files[i]),
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    };
    function onDragOver(e){
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = "copy";
    };
    function onDragLeave(e){
        e.preventDefault();
        setIsDragging(false);
    };
    function onDrop(e){
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if(files[i].type.split('/')[0] !== 'image') continue;
            if(!images.some((e) => e.name === files[i].name)){
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        id: URL.createObjectURL(files[i]),
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className='container my-5'>
            <div className='box-background'>
                <div className='box-header'>
                    <div className='box-left-content'>
                        <h3>Image Sorting Gallery</h3>
                    </div>
                    <div className='box-right-content'>
                        {/* <h5>Delete files</h5> */}
                    </div>
                </div>
                <div>
                    <div className='image-container'>
                        <SortableContext items={images} strategy={verticalListSortingStrategy}>
                                {/* We need components that use the useSortable hook  */}
                                {
                                    images.map((image) => <ImageSortableItem key={image.id} imageID={image.id} imageURL={image.url} imageName= {image.name}/>)
                                    
                                }
                        </SortableContext>

                        <div className='upload-box'>
                            <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                                {
                                    isDragging ? (
                                        <span className='select'>Drag Here</span>
                                        ) : (
                                                <span className='select' role='button' onClick={selectFiles}>
                                                    <div className='upload-image-icon text-center'>
                                                        <FontAwesomeIcon icon={faImage} />
                                                        <p>Add Image</p>
                                                    </div>
                                                </span>
                                            )
                                }
                                <input type='file' name='file' className='file' multiple ref={fileInputRef} onChange={onFilesSelect} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DndContext>
  )
}

export default ImageComponent;