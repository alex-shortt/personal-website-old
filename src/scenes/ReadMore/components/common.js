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

  & > a {
    color: black;
    transition: color ease 0.3s;
    position: relative;
    text-decoration: none;
    padding: 2px 4px;

    &:hover {
      color: white;

      &::after {
        height: 100%;
      }
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 2px;
      left: 0;
      bottom: 0;
      background-color: black;
      transition: all ease 0.3s;
    }
  }
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
  object-fit: contain;
  width: 95%;
  max-width: ${props => (props.double ? "800px" : "400px")};
  max-height: 500px;
  position: relative;
  cursor: pointer;

  @media screen and (max-width: 400px) {
    margin: 10px 8px;
  }
`

export const ReactPlayer = styled(ReactPlayerBase)`
  width: 100% !important;
  height: 100% !important;

  & > video {
    object-fit: cover;
  }

  & > video::-internal-media-controls-overlay-cast-button {
    display: none;
  }
`

export const Container = styled.div`
  margin: 15px;
  width: 95%;
  max-width: ${props => (props.double ? "800px" : "400px")};
  max-height: 500px;
  position: relative;
  cursor: pointer;

  @media screen and (max-width: 400px) {
    margin: 10px 8px;
  }
`

export const Indicator = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  color: white;
  filter: brightness(1.25);
`

const VideoCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`

export function Video(props) {
  const { url, double } = props

  const [playing, setPlaying] = useState(false)
  const toggle = useCallback(() => setPlaying(!playing), [playing])

  return (
    <Container onClick={toggle} double={double}>
      <ReactPlayer url={url} playing={playing} />
      {!playing && <VideoCover />}
      {!playing && <Indicator icon="play" />}
    </Container>
  )
}
