import React from "react"
import styled from "styled-components/macro"
import { Route, Switch } from "react-router-dom"

import SceneContainerBase from "components/SceneContainer"
import Menu from "scenes/Menu"
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
`

export default function ReadMore(props) {
  const {
    match: {
      params: { id }
    },
    location
  } = props

  const piece = pieces.find(pic => pic.id === id)

  return (
    <SceneContainer>
      <Helmet title={piece.title} />
      <Navbar location={`art - ${piece.title.toLowerCase()}`} backLink="/art" />
      <Content>
        <Switch location={location}>
          <Route path="/art/latent-explorer" exact component={LatentExplorer} />
          <Route path="/art/foundation" exact component={Foundation} />
          <Route path="/art/mediated-world" exact component={MediatedWorld} />
          <Route path="/" exact component={Menu} />
        </Switch>
      </Content>
    </SceneContainer>
  )
}
