import React from "react"
import styled, { keyframes } from "styled-components/macro"

import cloudImg from "assets/images/cloud.png"

const Container = styled.div`
  flex: 1;
  justify-content: flex-end;
`

const float = keyframes`
    0% {
        transform: translatey(0px)
    }

    50% {
        transform: translatey(-10px)
    }

    100% {
        transform: translatey(0px)
    }
`

const Image = styled.img.attrs({ src: cloudImg })`
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  animation: ${float} 7s ease-in-out infinite;

  @media screen and (max-width: 1100px) {
    width: 100%;
    height: auto;
  }
`

export default function NavImage(props) {
  const { ...restProps } = props

  return (
    <Container {...restProps}>
      <Image />
    </Container>
  )
}
