import React, { useState, useCallback } from "react"
import styled from "styled-components/macro"
import ReactPlayerBase from "react-player"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Text = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 200;
  font-size: 1.3rem;
  margin: 0.25em 0;
  line-height: 1.45em;
`

export const Title = styled.h2`
  font-family: proxima-nova, sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0.25em 0 0;
  text-transform: uppercase;
  letter-spacing: 1.7px;
`

export const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

export const Image = styled.img`
  margin: 15px;
  max-width: 350px;
  max-height: 500px;
`

export const ReactPlayer = styled(ReactPlayerBase)`
  width: 100% !important;
  height: 100% !important;
`

export const Container = styled.div`
  margin: 15px;
  width: 95%;
  max-width: ${props => (props.double ? "800px" : "400px")};
  max-height: 500px;
  position: relative;
  cursor: pointer;
`

export const Indicator = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  z-index: 5;
  color: white;
  filter: brightness(1.5);
`

export function Video(props) {
  const { url, double } = props
  const [playing, setPlaying] = useState(false)

  const toggle = useCallback(() => setPlaying(!playing), [playing])

  return (
    <Container onClick={toggle} double={double}>
      <ReactPlayer url={url} playing={playing} />
      {!playing && <Indicator icon="play" />}
    </Container>
  )
}
