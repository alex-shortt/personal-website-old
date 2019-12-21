import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components/macro"

import { ThreeWrapper } from "services/threeWrapper"
import Helmet from "components/Helmet"

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default function View(props) {
  const [setup, setSetup] = useState("false")
  const containerRef = useRef()
  const threeWrapper = new ThreeWrapper()

  useEffect(() => {
    if (setup === "false") {
      threeWrapper.sceneSetup(containerRef.current)
      threeWrapper.addCustomSceneObjects()
      threeWrapper.startAnimationLoop()
      setSetup("true")
    }
  }, [setup, threeWrapper])

  return (
    <Container ref={containerRef}>
      <Helmet title="View" />
    </Container>
  )
}
