import React from "react"
import styled, { css } from "styled-components/macro"
import { Link } from "react-router-dom"

const Container = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  padding: 5px 15px;
  box-sizing: border-box;
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

  color: black;
  transition: color ease 0.3s;
  position: relative;
  text-decoration: none;
  padding: 2px 4px;

  &:hover {
    color: white;

    &::after {
      height: 100%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 2px;
    left: 0;
    bottom: 0;
    background-color: black;
    transition: all ease 0.3s;
  }
`

export default function Navbar(props) {
  const { location, backLink } = props

  return (
    <Container>
      <Location>{location}</Location>
      <Location>//</Location>
      <BackLink to={backLink}>back</BackLink>
    </Container>
  )
}
