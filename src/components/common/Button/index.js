import React from "react"
import styled, { css } from "styled-components/macro"
import { Link } from "react-router-dom"

const styles = css`
  font-family: roboto-mono, sans-serif;
  font-size: 2rem;
  font-weight: 100;
  margin: 0 10px;
  background: transparent;
  border: 2px solid transparent;
  padding: 8px 15px;
  transition: all 0.15s ease-in;
  cursor: pointer;
  outline: none !important;
  color: black !important;
  text-decoration: none !important;
  position: relative;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    transition: all 0.15s ease-in;
    filter: blur(0);
  }

  &:hover,
  &:active,
  &:focus {
    background: rgba(255, 255, 255, 0.03);
    border: 2px solid black;
  }

  &:hover > div,
  &:active > div,
  &:focus > div {
    background: rgba(255, 255, 255, 0.05);
    filter: blur(3px);
    z-index: -1;
  }
`

const StyledLink = styled(Link)`
  ${styles}
`

const StyledA = styled.a`
  ${styles}
`

export default function Button(props) {
  const { children, type } = props

  if (type === "a") {
    return (
      <StyledA {...props}>
        {children} <div />
      </StyledA>
    )
  }

  return (
    <StyledLink {...props}>
      {children} <div />
    </StyledLink>
  )
}
