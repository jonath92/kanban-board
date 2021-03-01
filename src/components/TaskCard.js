import React from 'react'
import styled from 'styled-components/macro'
import BootstrapCard from 'react-bootstrap/Card';

// styles
const Card = styled(BootstrapCard)` 
    width: 100%;
    cursor: pointer;
`
const CardTitle = styled(BootstrapCard.Title).attrs(({
    className: "m-2"
}))``

const CardText = styled(BootstrapCard.Text).attrs(({
    className: "m-2 d-md-block d-none"
}))``

export default function TaskCard(props) {

    const {
        title,
        description,
        handleCardClicked } = props

    return (
        <Card onClick={() => handleCardClicked()}>
            <CardTitle>
                {title}
            </CardTitle>
            {description &&
                <CardText>
                    {description}
                </CardText>
            }
        </Card>
    )
}