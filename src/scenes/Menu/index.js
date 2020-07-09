import React from "react"
import styled from "styled-components/macro"

import SceneContainer from "components/SceneContainer"
import Helmet from "components/Helmet"

import ContactLinksBase from "./components/ContactLinks"
import NavLinks from "./components/NavLinks"
import NavImage from "./components/NavImage"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const NavContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const NavWrapper = styled.div`
  width: 90%;
  max-width: 700px;
  height: 90%;
  display: flex;

  @media screen and (max-width: 1100px) {
    flex-direction: column-reverse;
    height: auto;
  }
`

const ContactLinks = styled(ContactLinksBase)`
  justify-content: space-around;
  align-items: flex-end;
`

export default function Menu(props) {
  return (
    <SceneContainer>
      <Helmet title="" />
      <Container>
        <NavContainer>
          <NavWrapper>
            <NavLinks />
            <NavImage />
          </NavWrapper>
        </NavContainer>
        <ContactLinks />
      </Container>
    </SceneContainer>
  )
}
