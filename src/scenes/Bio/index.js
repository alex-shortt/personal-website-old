import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import SceneContainer from "components/SceneContainer"

export default function Bio(props) {
  return (
    <SceneContainer>
      <Helmet title="Bio" />
      hello bio
    </SceneContainer>
  )
}
