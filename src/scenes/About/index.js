import React, { useState } from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import SceneContainer from "components/SceneContainer"
import Navbar from "components/Navbar"

import TextContainerBase from "./components/TextContainer"

const Content = styled.div`
  width: 100%;
  padding: 25px 30px;
  box-sizing: border-box;
  display: flex;
`

const ImageContainer = styled.div`
  flex: 0.8;
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
        <ImageContainer />
        <Spacer />
        <TextContainer setScrollPerc={setScrollPerc} />
      </Content>
    </SceneContainer>
  )
}
