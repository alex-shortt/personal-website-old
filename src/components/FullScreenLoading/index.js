import React from "react"
import styled from "styled-components/macro"

const FullScreenWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  color: #fff;
`

export default function FullScreenLoading() {
  return <FullScreenWrapper />
}
