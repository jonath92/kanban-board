// external dependencies
import React, { useRef, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { DROP_ITEM_TYP } from '../Constants'
import { getEmptyImage } from 'react-dnd-html5-backend';

// allowing to pass style and className as it is not working good with slyed.component (and overwritting)
// display prop will be ignored however. Use padding for generating space - not margin (oterhwilse problem on firefox android 86.1.1)
export default function DraggableItem({ id, children, style, className }) {

    // this is used to get the Width of the dragged item in the CurstomDragLayer
    const childRef = useRef(null);

    function getWidth() {
        return (childRef.current) ? childRef.current.offsetWidth : 0
    }

    const [{ isDragging }, dragRef, preview] = useDrag(
        {
            item: {
                type: DROP_ITEM_TYP,
                id,
                getWidth
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            })
        })

    useEffect(() => {
        preview(getEmptyImage());
    }, [preview]);

    if (isDragging) {
        return <div />;
    }

    return (
        // It needs an outer div as otherwilse scrolling on firefox/android is not working. When using no outer div the item is dragged even when clicking on the margin. Using styled-component for the outer div also doesn't work as in this case dragging is not working properly. In this case the dragged box sticks on the corner of the dropzone while dragging
        // This is a critical piece. Be careful when changing. E.g. using flexbox on the outer div makes problems on safari
        <div {...{ className }} style={{ ...style, display: "block" }}>
            <div ref={dragRef}>
                {/* TODO: better forwarding the ref to the children?*/}
                <div ref={childRef}>
                    {children}
                </div>
            </div>
        </div >


    )
}
