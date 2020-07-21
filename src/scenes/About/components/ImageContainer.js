import React from "react"
import styled from "styled-components/macro"

import videoSrc from "assets/videos/mountainRange.mp4"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Video = styled.video`
  width: 90%;
  max-width: 400px;

  @media screen and (max-width: 1000px) {
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
`

// use this command to get a smooth video output
// ffmpeg -i mountainRange.mp4 -c:v libx264 -profile:v baseline -x264opts keyint=3:min-keyint=2 -movflags +faststart+rtphint output.mp4

export default function VideoContainer(props) {
  const { video, ...restProps } = props

  return (
    <Container {...restProps}>
      <Video muted ref={video}>
        <source src={videoSrc} type="video/mp4" />
      </Video>
    </Container>
  )
}
