import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"
import { Redirect } from "react-router-dom"

import SceneContainerBase from "components/SceneContainer"
import Helmet from "components/Helmet"
import Navbar from "components/Navbar"

import pieces from "../Art/assets/pieces"

import LatentExplorer from "./scenes/LatentExplorer"
import MediatedWorld from "./scenes/MediatedWorld"
import Foundation from "./scenes/Foundation"

const SceneContainer = styled(SceneContainerBase)`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding: 25px;
  flex: 1;
  overflow-y: auto;

  @media screen and (max-width: 850px) {
    padding: 25px 10px;
  
`

const ArtContent = props => {
  const { id } = props

  if (id === "latent-explorer") {
    return <LatentExplorer />
  }
  if (id === "foundation") {
    return <Foundation />
  }
  if (id === "mediated-world") {
    return <MediatedWorld />
  }

  return <Redirect to="/art" />
}

export default function ReadMore(props) {
  const {
    match: {
      params: { id }
    }
  } = props

  const piece = pieces.find(pic => pic.id === id)

  // dont' ask me why, but this delay is needed to render the component
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => setShow(true), 100)
  }, [])

  return (
    <SceneContainer>
      <Helmet title={piece.title} />
      <Navbar location={piece.title.toLowerCase()} backLink="/art" />
      <Content>{show && <ArtContent id={id} />}</Content>
    </SceneContainer>
  )
}
