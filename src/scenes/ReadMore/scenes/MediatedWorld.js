import React, { useState, useCallback } from "react"
import styled from "styled-components/macro"
import ReactPlayerBase from "react-player"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const Image = styled.img`
  margin: 15px;
  max-width: 350px;
  max-height: 500px;
`

const ReactPlayer = styled(ReactPlayerBase)`
  width: 100% !important;
  height: 100% !important;
`

const Container = styled.div`
  margin: 15px;
  width: 95%;
  max-width: 400px;
  max-height: 500px;
  position: relative;
  cursor: pointer;
`

const Indicator = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  z-index: 5;
  color: white;
  filter: brightness(1.5);
`

function Video(props) {
  const { url } = props
  const [playing, setPlaying] = useState(false)

  const toggle = useCallback(() => setPlaying(!playing), [playing])

  return (
    <Container onClick={toggle}>
      <ReactPlayer url={url} playing={playing} />
      {!playing && <Indicator icon="play" />}
    </Container>
  )
}

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
