import React from "react"
import styled from "styled-components/macro"

const Image = styled.img`
  width: 0;
  height: 0;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
`

export default function PreloadImages(props) {
  const { images } = props

  return (
    <>
      {images.map(image => (
        <Image key={image} src={image} />
      ))}
    </>
  )
}
