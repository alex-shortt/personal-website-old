import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Entry from "components/Entry"
import Navbar from "components/Navbar"
import SceneContainerBase from "components/SceneContainer"

import websites from "./assets/websites"

const SceneContainer = styled(SceneContainerBase)`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  width: 100%;
  flex: 1;
  margin: 0 auto;
  padding: 50px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export default function Websites(props) {
  return (
    <SceneContainer>
      <Helmet title="Websites" />
      <Navbar location="websites" backLink="/" />
      <Content>
        <Helmet title="Websites" />
        {websites.map(site => (
          <Entry {...site} />
        ))}
      </Content>
    </SceneContainer>
  )
}
