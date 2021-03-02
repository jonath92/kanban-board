// external dependencies
import React, { useContext } from 'react'
import styled from 'styled-components/macro'

// own modules
import PlusIcon from './PlusIcon'

// styles
const Header = styled.div.attrs(({
    className: "my-3"
}))` 
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden
`

const Title = styled.h4.attrs(({
    className: "my-0"
}))` 
    flex-grow: 1;
    text-align: center;
    font-size: 1.15rem;

    // medium devices and larger (see: https://getbootstrap.com/docs/4.0/layout/overview/)
    @media (min-width: 768px) { 
        font-size: 1.5rem;
     }
`

export default function Cell(props) {

    const {
        title,
        MainContent,
        onPlusClick
    } = props


    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                <PlusIcon onClick={() => onPlusClick()} />
            </Header>
            {MainContent}
        </Container>)
}
