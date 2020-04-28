import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

import Sizer from "services/noisesizer"

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(-5%);
  width: 0;
  height: 0;
  z-index: 2;
  opacity: 0.75;
`
const mult = 1.29

const getWidth = () => (Sizer.getWidth() * mult * window.innerHeight) / 1080
const getHeight = () => (Sizer.getHeight() * mult * window.innerHeight) / 1080

export default function Display(props) {
  const { children } = props

  const [width, setWidth] = useState(-1)
  const [height, setHeight] = useState(-1)

  useEffect(() => {
    if (width === -1 || height === -1) {
      setWidth(getWidth())
      setHeight(getHeight())
      window.addEventListener("resize", () => {
        setWidth(getWidth())
        setHeight(getHeight())
      })
    }
  }, [height, width])

  return (
    <Container style={{ width: `${width}px`, height: `${height}px` }}>
      {children}
    </Container>
  )
}
