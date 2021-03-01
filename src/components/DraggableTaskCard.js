import React, { useRef, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { DROP_ITEM_TYP } from '../Constants'
import TaskCard from './TaskCard'
import styled from 'styled-components/macro'
import { getEmptyImage } from 'react-dnd-html5-backend';

const DragContainer = styled.div.attrs(({
    className: "my-4 my-md-3"
}))``

export default function DraggableTaskCard(props) {

    const { id, ...otherProps } = props

    // this is used to get the Width of the dragged item in the CurstomDragLayer
    const taskCardRef = useRef(null);
    function getWidth() {
        return (taskCardRef.current) ? taskCardRef.current.offsetWidth : 0
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
        <div style={{ width: "90%" }}>
            <DragContainer ref={dragRef}>
                {/* TODO: better forward the ref to taskcard */}
                <div ref={taskCardRef}>
                    <TaskCard {...otherProps} />
                </div>
            </DragContainer>
        </div>


    )
}
