import React, { useState, useEffect, useContext, useRef } from "react"
import styled from "styled-components/macro"

import Sizer from "services/noisesizer"
import { EnvironmentContext } from "services/environment"

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(-5%) translateZ(0px);
  width: 0;
  height: 0;
  z-index: 2;
  opacity: 0.75;
`
const RotateContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  //border: 2px solid red;
  //box-sizing: border-box;
`

const Indicator = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%. -50%);
  z-index: 5;
  background: red;
`

const Indicator2 = styled(Indicator)`
  top: 0;
  left: 0;
  transform: none;
`
const Indicator3 = styled(Indicator)`
  top: 0;
  left: unset;
  right: 0;
  transform: none;
`
const Indicator4 = styled(Indicator)`
  top: unset;
  left: unset;
  bottom: 0;
  right: 0;
  transform: none;
`
const Indicator5 = styled(Indicator)`
  top: unset;
  left: 0;
  bottom: 0;
  transform: none;
`

const mult = 1.286

const getWidth = () => (Sizer.getWidth() * mult * window.innerHeight) / 1080
const getHeight = () => (Sizer.getHeight() * mult * window.innerHeight) / 1080

export default function Display(props) {
  const { children } = props
  const { scene } = useContext(EnvironmentContext)

  const rotateRef = useRef()
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

    if (rotateRef.current && scene && !scene.displayRef) {
      scene.displayRef = rotateRef.current
    }
  }, [height, scene, width])

  return (
    <Container
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <RotateContainer ref={rotateRef}>{children}</RotateContainer>
    </Container>
  )
}
