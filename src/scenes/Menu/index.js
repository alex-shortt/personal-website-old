import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { Button } from "components/common"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-family: aktiv-grotesk, sans-serif;
  font-size: 4rem;
  font-weight: 100;
  letter-spacing: 2px;
  margin: 0;
`

const Row = styled.div`
  display: flex;
`

export default function Menu(props) {
  return (
    <Container>
      <Title>Alex Shortt</Title>
      <br />
      <Row>
        <Button as={Link} to="/sites">
          Sites
        </Button>
        <Button as={Link} to="/projects">
          Projects
        </Button>
      </Row>
    </Container>
  )
}
