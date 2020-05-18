import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { Button } from "components/common"
import SceneContainer from "components/SceneContainer"
import Helmet from "components/Helmet"

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
    <SceneContainer>
      <Helmet title="" />
      <Container>
        <Title>ALEX SHORTT</Title>
        <br />
        <br />
        <br />
        <Row>
          <Button as={Link} to="/websites">
            websites
          </Button>
          <Button as={Link} to="/art">
            art
          </Button>
          <Button as={Link} to="/about">
            about
          </Button>
        </Row>
      </Container>
    </SceneContainer>
  )
}
