import React, { useState } from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import SceneContainerBase from "components/SceneContainer"
import Navbar from "components/Navbar"

import TextContainerBase from "./components/TextContainer"
import ImageContainerBase from "./components/ImageContainer"

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

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    margin-top: 10px;
  }
`

const ImageContainer = styled(ImageContainerBase)`
  flex: 0.8;
  @media screen and (max-width: 1000px) {
    height: 30%;
  }
`

const Spacer = styled.div`
  flex: 0.05;
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
        <ImageContainer scrollPerc={scrollPerc} />
        <Spacer />
        <TextContainer setScrollPerc={setScrollPerc} />
      </Content>
    </SceneContainer>
  )
}
