import React, { useState, useCallback } from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import SceneContainerBase from "components/SceneContainer"
import Navbar from "components/Navbar"

import Navigation from "./components/Navigation"
import Info from "./components/Info"
import pieces from "./assets/pieces"

const SceneContainer = styled(SceneContainerBase)`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  width: 100%;
  flex: 1;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const BackgroundImage = styled.div`
  width: 60%;
  height: 85%;
  background-position: right;
  background-size: cover;
  background-image: url(${props => props.imgSrc});
`

export default function Art(props) {
  const [pos, setPos] = useState(0)

  const prevPos = useCallback(() => {
    setPos(pos - 1 < 0 ? pieces.length - 1 : pos - 1)
  }, [pos])

  const nextPos = useCallback(() => {
    setPos(pos + 1 > pieces.length - 1 ? 0 : pos + 1)
  }, [pos])

  const { heroImage } = pieces[pos]

  return (
    <SceneContainer>
      <Helmet title="Art" />
      <Navbar location="art" backLink="/" />
      <Content>
        <BackgroundImage imgSrc={heroImage} />
        <Info piece={pieces[pos]} />
      </Content>
      <Navigation pos={pos} num={pieces.length} prev={prevPos} next={nextPos} />
    </SceneContainer>
  )
}
