import React from "react"
import styled from "styled-components/macro"

import Arrow from "components/Arrow"

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Indicator = styled.h2`
  font-family: proxima-nova, sans-serif;
  font-weight: 200;
  font-size: 2rem;
  margin: 0 10px;
  color: black;
  width: 40px;
  text-align: center;
  user-select: none;
`

export default function Navigation(props) {
  const { pos, num, prev, next } = props

  return (
    <Container>
      <Arrow dir="left" onClick={prev} />
      <Indicator>
        {pos + 1}/{num}
      </Indicator>
      <Arrow dir="right" onClick={next} />
    </Container>
  )
}
