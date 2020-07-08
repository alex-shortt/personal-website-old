import React from "react"
import styled, { keyframes } from "styled-components/macro"

import useLoader from "services/useLoader"

const scrollGradient = keyframes`
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
 `
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: ${props => (props.loaded ? 0 : 1)};
  pointer-events: ${props => (props.loaded ? "none" : "all")};
  transition: opacity 1.75s cubic-bezier(0.44, 0.09, 0.45, 0.89);
  //transition-delay: 0.25s;
  z-index: 10001;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Pretty = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c837b7, #40f7f7);
  background-size: 300% 300%;
  animation: ${scrollGradient} 10s ease infinite;
  opacity: ${props => (props.loaded ? 0 : 0.8)};
  transition: opacity 0.5s cubic-bezier(0.44, 0.09, 0.45, 0.89);
  filter: blur(16px);

  &::after {
    content: " ";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
    background: radial-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8)
    );
  }
`

export default function Loading(props) {
  const { loaded } = useLoader()

  return (
    <Container loaded={loaded}>
      <Pretty loaded={loaded} />
    </Container>
  )
}
