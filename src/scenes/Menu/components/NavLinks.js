import React from "react"
import styled, { css } from "styled-components/macro"
import { Link as LinkBase } from "react-router-dom"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 7%;
  justify-content: center;
`

const LinkStyles = css`
  position: relative;
  text-decoration: none;
  display: inline-block;
  color: black;
  padding: 1px 4px;
  transition: color ease 0.3s;
  cursor: pointer;
  margin: 8px 0;
  font-size: 2.5rem;
  font-family: proxima-nova, sans-serif;

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
    height: 0%;
    left: 0;
    bottom: 0;
    background-color: black;
    transition: all ease 0.3s;
  }
`

const Link = styled(LinkBase)`
  ${LinkStyles}
`

const Anchor = styled.a`
  ${LinkStyles}
`

export default function NavLinks(props) {
  const { ...restProps } = props

  return (
    <Container {...restProps}>
      <Link to="/websites">websites</Link>
      <Link to="/art">art</Link>
      <Link to="/about">about</Link>
      <Anchor href="https://medium.com" target="_blank">
        blog
      </Anchor>
    </Container>
  )
}
