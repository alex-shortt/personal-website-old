import React from "react"
import styled from "styled-components/macro"

const Container = styled.div``

export default function TextContainer(props) {
  const { setScrollPerc, ...restProps } = props

  return <Container {...restProps}>hello world</Container>
}
