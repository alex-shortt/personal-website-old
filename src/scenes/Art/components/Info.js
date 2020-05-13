import React from "react"
import styled from "styled-components/macro"

import { Button as ButtonBase } from "components/common"

const Container = styled.div`
  flex: 1;
  display: flex;
  padding: 0 25px;
  justify-content: center;
`

const Wrapper = styled.div`
  box-sizing: border-box;
  max-width: 350px;
`

const Title = styled.h2`
  font-family: proxima-nova, sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0.25em 0 0.75em;
  text-transform: uppercase;
  letter-spacing: 1.7px;
`

const Text = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 200;
  font-size: 1.1rem;
  margin: 0.25em 0;
  line-height: 1.45em;
`

const Button = styled(ButtonBase)`
  font-size: 1.1rem;
  display: inline-block;
  text-align: center;
  margin: 15px 0 0 50%;
  transform: translateX(-50%);
`

export default function Info(props) {
  const { piece } = props

  const { id, title, abstract } = piece

  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <Text>{abstract}</Text>
        <Button to={`/art/${id}`}>Read More</Button>
      </Wrapper>{" "}
    </Container>
  )
}
