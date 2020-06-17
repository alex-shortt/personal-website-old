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
        This piece showcases a direct connection between humans and computers by
        connecting ranges of expression in each. For the human range of
        expression I picked their position as movement comes naturally to us.
        For the computer I trained a GAN on images of a mountain. With tight
        constraints on both the human and computer, everyone that interacted
        with the piece found their own way of expressing themselves: some
        danced, some walked around. They slowly began to learn the mapping of
        expression and were eventually able to control the flow of ideas to
        craft their own story.
      </Text>
    </ArtReadMore>
  )
}
