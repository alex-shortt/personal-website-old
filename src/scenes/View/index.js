import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components/macro"

import { ThreeWrapper } from "services/threeWrapper"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const TextBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: black;
  font-size: 20pt;
  z-index: 0;
  pointer-events: none;
`

export default function View(props) {
  const [setup, setSetup] = useState("false")
  const containerRef = useRef()
  const threeWrapper = new ThreeWrapper()

  useEffect(() => {
    if (setup === "false") {
      threeWrapper.threeSetup(containerRef.current)
      threeWrapper.sceneSetup()
      threeWrapper.startAnimationLoop()
      setSetup("true")
    }
  }, [setup, threeWrapper])

  return (
    <>
      <Container ref={containerRef} />
    </>
  )
}
