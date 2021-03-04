import React, { useState, useEffect } from 'react'

import { useDragLayer } from 'react-dnd';
import styled from 'styled-components/macro'

const Layer = styled.div`
    position: fixed;
    pointer-events: none; 
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%
`
export default function CustomDragLayer({ DragItem }) {

    const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setX(currentOffset ? currentOffset.x : 0)
        setY(currentOffset ? currentOffset.y : 0)
    }, [currentOffset])

    useEffect(() => {
        if (isDragging) {
            setWidth(item.getWidth())
        }
    }, [isDragging, item])

    const MovingDragItem = () => {

        return (
            //I would prefer to also use styled components here but it is than very slow for some reason...  
            <div style={{
                transform: `translate(${x}px, ${y}px`,
                width
            }}>
                <DragItem id={item.id} />
            </div>
        )
    }

    if (!isDragging) return (<Layer />)

    return (
        <Layer>
            <MovingDragItem />
        </Layer>
    )
}
