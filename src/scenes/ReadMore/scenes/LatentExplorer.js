import React from "react"

import ArtReadMore from "../components/ArtReadMore"
import { Video, Title, Text, Image, ImageContainer } from "../components/common"

export default function LatentExplorer(props) {
  return (
    <ArtReadMore id="latent-explorer">
      <Title>Statement</Title>
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
      <br />
      <Title>Gallery</Title>
      <ImageContainer>
        <Image src="https://assets.mediated.world/site/latent-explorer/gan-output.png" />
        <Video url="https://assets.mediated.world/site/latent-explorer/dancing.mp4" />
        <Video
          url="https://assets.mediated.world/site/latent-explorer/wide-video.mp4"
          double
        />
      </ImageContainer>
    </ArtReadMore>
  )
}
