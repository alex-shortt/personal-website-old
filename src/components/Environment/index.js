import React, { useState, useRef, useEffect, useContext } from "react"
import styled from "styled-components/macro"

import { ThreeScene } from "services/threeScene"
import { EnvironmentContext } from "services/environment"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`

export default function Environment(props) {
  const { setScene } = useContext(EnvironmentContext)

  const [setup, setSetup] = useState(false)

  const containerRef = useRef()

  useEffect(() => {
    if (setup === false) {
      const scene = new ThreeScene()
      scene.threeSetup(containerRef.current)
      scene.sceneSetup()
      scene.startAnimationLoop()

      setScene(scene)
      setSetup(true)
    }
  }, [setScene, setup])

  return <Container ref={containerRef} />
}
