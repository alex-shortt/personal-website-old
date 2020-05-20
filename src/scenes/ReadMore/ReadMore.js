import React from "react"
import styled from "styled-components/macro"
import { Route, Switch } from "react-router-dom"

import SceneContainerBase from "components/SceneContainer"
import Menu from "scenes/Menu"
import Helmet from "components/Helmet"
import Navbar from "components/Navbar"

import Awge from "./scenes/Awge"

const SceneContainer = styled(SceneContainerBase)`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding: 25px;
`

export default function ReadMore(props) {
  const {
    match: {
      params: { id },
      url
    },
    location
  } = props

  const type = url.split("/")[1]
  const idLowerWords = id.replace("-", " ")
  const idWords = capitalizeWords(idLowerWords)

  return (
    <SceneContainer>
      <Helmet title={idWords} />
      <Navbar location={`${type} - ${idLowerWords}`} backLink={`/${type}`} />
      <Content>
        <Switch location={location}>
          <Route path="/websites/awge" exact component={Awge} />
          <Route path="/" exact component={Menu} />
        </Switch>
      </Content>
    </SceneContainer>
  )
}

function capitalizeWords(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
