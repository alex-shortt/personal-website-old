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
      <Title>Links</Title>
      <Text>
        <a
          href="https://github.com/alex-shortt/nature-gan"
          target="_blank"
          rel="noopener noreferrer"
        >
          nature-gan
        </a>{" "}
        - GAN code used to train a model on images of a mountain
        <br />
        <a
          href="https://nature-gan-data.s3.us-east-2.amazonaws.com/flickr-mountain-generator-200.pt"
          target="_blank"
          rel="noopener noreferrer"
        >
          flickr-mountain-generator-200.pt
        </a>{" "}
        - link to download final generator model (500MB)
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
