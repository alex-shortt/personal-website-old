import React from "react"
import styled from "styled-components/macro"

const SVG = styled.svg`
  cursor: pointer;
  padding: 5px;
  height: ${props => 70 * props.scale}px;
  width: ${props => 70 * props.ratio * props.scale}px;

  &:hover > * {
    stroke-width: 5;
  }
`

const Line = styled.polyline`
  transition: all 0.15s ease-in;
`

export default function Arrow(props) {
  const { dir, scale = 0.6, ratio = 0.42, ...restProps } = props

  // scale :: 1 <==> w = 70
  // ratio :: w / h, ^ = wider, v = taller

  const points = dir === "left" ? "95,95 5,50 95,5" : "5,5 95,50 5,95"

  return (
    <SVG
      {...restProps}
      scale={scale}
      ratio={ratio}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Line
        fill="none"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        points={points}
      />
    </SVG>
  )
}
