// external dependencies
import React from 'react'
import styled from 'styled-components/macro'

// Requires Bootstrap for the class p-2
// https://react-bootstrap.github.io/getting-started/introduction#installation
const Container = styled.div.attrs(({
    className: `p-2`
}))`
  display              : grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows   : 1fr 1fr;
  grid-column-gap      : 1.75rem;
  height               : 100vh;
`

/**
 * Reprents a 2 * 2 Matrix which fills out the full width and height of the parent container
 * 
 * @param {jsx} children should contain 4 elements. The first 2 are shown in the first row from left to right, the third and 4 the in the second row
 */

export default function Matrix({ children }) {

    return (
        <Container>
            {children}
        </Container>
    )
}
