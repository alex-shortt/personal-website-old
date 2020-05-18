import React, { useState } from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import SceneContainerBase from "components/SceneContainer"
import Navbar from "components/Navbar"

import TextContainerBase from "./components/TextContainer"

const SceneContainer = styled(SceneContainerBase)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Content = styled.div`
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  overflow-y: auto;
`

const ImageContainer = styled.div`
  flex: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spacer = styled.div`
  flex: 0.15;
`

const TextContainer = styled(TextContainerBase)`
  flex: 1;
`

export default function About(props) {
  const [scrollPerc, setScrollPerc] = useState(0)

  return (
    <SceneContainer>
      <Helmet title="About" />
      <Navbar location="about" backLink="/" />
      <Content>
        <ImageContainer>{scrollPerc.toFixed(4) * 100}%</ImageContainer>
        <Spacer />
        <TextContainer setScrollPerc={setScrollPerc} />
      </Content>
    </SceneContainer>
  )
}
