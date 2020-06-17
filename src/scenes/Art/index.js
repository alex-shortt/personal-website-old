import React, { useState, useCallback } from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import SceneContainerBase from "components/SceneContainer"
import Navbar from "components/Navbar"
import PreloadImages from "components/PreloadImages"

import Navigation from "./components/Navigation"
import PieceDisplay from "./components/PieceDisplay"
import pieces from "./assets/pieces"

const SceneContainer = styled(SceneContainerBase)`
  display: flex;
  flex-direction: column;
`

export default function Art(props) {
  const [pos, setPos] = useState(0)

  const prevPos = useCallback(() => {
    setPos(pos - 1 < 0 ? pieces.length - 1 : pos - 1)
  }, [pos])

  const nextPos = useCallback(() => {
    setPos(pos + 1 > pieces.length - 1 ? 0 : pos + 1)
  }, [pos])

  return (
    <SceneContainer>
      <Helmet title="Art" />
      <Navbar location="art" backLink="/" />
      <PieceDisplay piece={pieces[pos]} />
      <Navigation pos={pos} num={pieces.length} prev={prevPos} next={nextPos} />
      <PreloadImages images={pieces.map(piece => piece.heroImage)} />
    </SceneContainer>
  )
}
