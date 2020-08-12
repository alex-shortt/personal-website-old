import React, { useState, useEffect, useContext, useRef } from "react"
import styled from "styled-components/macro"

import { EnvironmentContext } from "services/environment"

const Container = styled.div`
  width: 0;
  height: 0;
  z-index: 2;
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export default function Display(props) {
  const { children } = props
  const { scene } = useContext(EnvironmentContext)

  const displayRef = useRef()
  const [setup, setSetup] = useState(false)

  useEffect(() => {
    if (scene && !setup) {
      scene.displayRenderer.addDomElementToScene(displayRef.current)
      setSetup(true)
    }
  }, [scene, setup])

  return (
    <Container ref={displayRef}>
      <Wrapper>{children}</Wrapper>
    </Container>
  )
}
