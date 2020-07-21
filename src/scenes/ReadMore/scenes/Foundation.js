import React from "react"

import ArtReadMore from "../components/ArtReadMore"
import { Video, Title, Text, Image, ImageContainer } from "../components/common"

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
      <Title>Links</Title>
      <Text>
        <a
          href="https://github.com/alex-shortt/mediated-world-pieces/tree/master/pieces/Foundation"
          target="_blank"
          rel="noopener noreferrer"
        >
          foundation source code
        </a>{" "}
        - code I made to analyze microphone input and send messages over serial
      </Text>
      <br />
      <Title>Gallery</Title>
      <ImageContainer>
        <Image src="https://assets.mediated.world/site/foundation/setup.jpg" />
        <Video url="https://assets.mediated.world/site/foundation/inbed.mp4" />
      </ImageContainer>
    </ArtReadMore>
  )
}
