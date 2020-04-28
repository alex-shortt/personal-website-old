import React, { useState, useRef, useEffect } from "react"
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

export default function Environment(props) {
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

  return <Container ref={containerRef} />
}
