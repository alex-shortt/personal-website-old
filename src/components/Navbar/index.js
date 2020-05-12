import React from "react"
import styled, { css } from "styled-components/macro"
import { Link } from "react-router-dom"

const Container = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  padding: 5px 15px;
  box-sizing: border-box;
  box-shadow: -1px 0px 12px rgba(204, 204, 204, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.15s ease-in;
    background: rgba(255, 255, 255, 0.05);
    filter: blur(3px);
    z-index: -1;
  }
`

const TextStyle = css`
  font-family: roboto-mono, sans-serif;
  font-size: 1.25rem;
  margin: 0 15px;
  color: black;
`

const Location = styled.p`
  ${TextStyle}
`

const BackLink = styled(Link)`
  ${TextStyle};
`

export default function Navbar(props) {
  const { location, backLink } = props

  return (
    <Container>
      <Location>{location}</Location>
      <Location>//</Location>
      <BackLink to={backLink}>back</BackLink>
      <div />
    </Container>
  )
}