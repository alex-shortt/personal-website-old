import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Entry from "components/Entry"
import awgePic from "assets/websites/AWGE-1.png"
import awgeForumPic from "assets/websites/AWGEFORUMS-1.png"
import antiPic from "assets/websites/ANTI-1.png"
import sashSmilePic from "assets/websites/SASH-SMILE-1.png"
import sashFormulaPic from "assets/websites/SASH-FORMULA-1.png"
import Navbar from "components/Navbar"

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 50px;
  box-sizing: border-box;
  overflow-y: auto;
`

export default function Websites(props) {
  const awgeSite = {
    id: "awge",
    title: "AWGE",
    subtitle: "A creative agency founded by A$AP Rocky",
    link: "https://awge.com",
    image: awgePic
  }

  const awgeForumSite = {
    id: "awge-forums",
    title: "AWGE Forums",
    subtitle: "Forums for the AWGE Community",
    link: "https://forums.awgeshit.com",
    image: awgeForumPic
  }

  const antiSite = {
    id: "anti",
    title: "ANTI",
    subtitle: "New York-based Streetwear Brand",
    link: "https://beta.anti-eshop.com",
    image: antiPic
  }

  const sashSmile = {
    id: "sash-smile",
    title: "Smile",
    subtitle: `Site for single "${"Smile"}" from SASH`,
    link: "http://smile.sashsite.com.s3-website-us-west-1.amazonaws.com/",
    image: sashSmilePic
  }

  const sashFormula = {
    id: "sash-formula",
    title: "Not A Formula",
    subtitle: `Site for "${"Not A Formula EP"}" from SASH`,
    link: "https://www.sashsite.com",
    image: sashFormulaPic
  }

  return (
    <>
      <Navbar location="websites" backLink="/" />
      <Container>
        <Helmet title="Websites" />
        <Entry {...awgeSite} />
        <Entry {...awgeForumSite} />
        <Entry {...antiSite} />
        <Entry {...sashSmile} />
        <Entry {...sashFormula} />
      </Container>
    </>
  )
}
