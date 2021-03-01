// external dependencies
import React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components/macro'

// own modules
import { DROP_ITEM_TYP } from '../Constants'

const Container = styled.div` 
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        align-items: center;
        background-color: ${props => props.isOver ? '#add8e6' : '#f4f3fb'} 
`

export default function Dropzone({ onDrop, children }) {

    const [{ isOver }, drop] = useDrop({
        accept: DROP_ITEM_TYP,
        drop: (item) => onDrop(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <Container ref={drop} {...{ isOver }}>
            {children}
        </Container>
    )
}