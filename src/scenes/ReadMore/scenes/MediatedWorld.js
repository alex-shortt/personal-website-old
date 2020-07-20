import React from "react"

import ArtReadMore from "../components/ArtReadMore"
import { Video, Title, Text, Image, ImageContainer } from "../components/common"

export default function MediatedWorld(props) {
  return (
    <ArtReadMore id="mediated-world">
      <Title>Statement</Title>
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
      <br />
      <Title>Links</Title>
      <Text>
        <a
          href="https://mediated.world"
          target="_blank"
          rel="noopener noreferrer"
        >
          mediated.world
        </a>{" "}
        - journal for my work on the world
        <br />
        <a
          href="https://trailer.mediated.world"
          target="_blank"
          rel="noopener noreferrer"
        >
          trailer.mediated.world
        </a>{" "}
        - generative trailer for the world, runs directly in the browser
      </Text>
      <br />
      <Title>Gallery</Title>
      <ImageContainer>
        <Image src="https://assets.mediated.world/site/showcase/flyer.png" />
        <Image src="https://assets.mediated.world/site/showcase/hallway.jpg" />
        <Video url="https://assets.mediated.world/site/showcase/foundation.mp4" />
        <Image src="https://assets.mediated.world/site/showcase/opportunity.jpg" />
        <Image src="https://assets.mediated.world/site/showcase/bar.jpg" />
        <Video url="https://assets.mediated.world/site/showcase/living children.mp4" />
      </ImageContainer>
    </ArtReadMore>
  )
}
