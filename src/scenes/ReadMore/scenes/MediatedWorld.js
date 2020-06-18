import React from "react"
import styled from "styled-components/macro"

import ArtReadMore from "../components/ArtReadMore"

const Text = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 200;
  font-size: 1.3rem;
  margin: 0.25em 0;
  line-height: 1.45em;
`

export default function MediatedWorld(props) {
  return (
    <ArtReadMore id="mediated-world">
      <Text>
        <i>mediated.world</i> depicts an abstract model of our own world through
        the lens of information theory by creating an analogy between
        information and light. Defining light itself gives meaning to every
        visual mediation through its color, brightness, and position. The
        abstraction allows for complex and large-scale relationships to be
        revealed through intuitive visual relationships, staying technically and
        ideologically consistent while providing a satisfying aesthetic for the
        casual spectator. The model so generally defined allows for its
        expression in any visual medium, which I took advantage of for the show,
        presenting 3 installations and 1 digital piece.
      </Text>
    </ArtReadMore>
  )
}
