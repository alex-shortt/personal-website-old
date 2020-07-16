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

const Title = styled.h2`
  font-family: proxima-nova, sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0.25em 0 0;
  text-transform: uppercase;
  letter-spacing: 1.7px;
`

export default function Foundation(props) {
  return (
    <ArtReadMore id="foundation" dark>
      <Title>Statement</Title>
      <Text>
        This piece stood out from my show as the most simple artifact from{" "}
        <i>mediated.world</i>. It depicts a direct connection of information
        from music to light, with three light strips existing as three frequency
        ranges of the playing audio. The three strips rotate through triadic
        colors relative to each other as, relative to the piece, the combined
        frequency ranges make up the sample space. The brightness of each strip
        is mapped to the volume of the frequency range as this signifies the
        intensity of the same output. I introduced this piece at the
        mediated.world Showcase and eventually installed it in more places.
      </Text>
      <br />
      <Title>Gallery</Title>
    </ArtReadMore>
  )
}
