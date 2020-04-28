import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Entry from "components/Entry"
import awgePic from "assets/AWGE-1.png"
import awgeForumPic from "assets/AWGEFORUMS-1.png"

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
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

  return (
    <Container>
      <Helmet title="Websites" />
      <Entry {...awgeSite} />
      <Entry {...awgeForumSite} />
      <Entry {...awgeSite} />
      <Entry {...awgeSite} />
    </Container>
  )
}
