import React, { useRef } from "react"
import styled from "styled-components/macro"

import videoSrc from "assets/videos/strangeClouds.mp4"

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

export default function VideoContainer(props) {
  const { scrollPerc, ...restProps } = props

  const video = useRef()
  if (video.current) {
    const maxTime = video.current.duration
    const timePos = scrollPerc * maxTime
    if (timePos) {
      video.current.currentTime = timePos
    }
  }

  return (
    <Container {...restProps}>
      <Video muted ref={video}>
        <source src={videoSrc} type="video/mp4" />
      </Video>
    </Container>
  )
}
